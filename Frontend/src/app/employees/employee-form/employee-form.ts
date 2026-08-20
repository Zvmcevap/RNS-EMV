import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core'; // 👈 Added ChangeDetectorRef
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { API_URL } from '../../services/api.config';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css']
})
export class EmployeeFormComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef); 

  isEditMode = false;
  employeeId = '';
  loading = false;

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  employee: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    jobTitle: '',
    hireDate: '',
    status: 'active',
    salary: ''
  };

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    console.log('DEBUG 1: Employee ID detected:', this.employeeId);
    
    if (this.employeeId) {
      this.isEditMode = true;
      this.loading = true; 
      
      if (isPlatformBrowser(this.platformId)) {
        console.log('DEBUG 2: Running in Browser. Triggering loadEmployee.');
        setTimeout(() => {
          this.loadEmployee();
        }, 50); // 50ms delay lets Angular finish mounting before the API call
      } else {
        console.log('DEBUG 2: Running on Server. Skipping HTTP fetch.');
      }
    }
  }

  loadEmployee(): void {
    console.log('DEBUG 3: Sending API request to backend...');
    this.employeeService.getEmployee(this.employeeId).subscribe({
      next: (res: any) => {
        console.log('DEBUG 4: API Response received successfully!', res);
        try {
          const employeeData = res?.data?.employee || res?.employee || res?.data || res;
          console.log('DEBUG 5: Processed Employee Object:', employeeData);
          
          if (employeeData && typeof employeeData === 'object') {
            this.employee = { ...employeeData };

            if (this.employee.hireDate) {
              const parsedDate = new Date(this.employee.hireDate);
              if (!isNaN(parsedDate.getTime())) {
                this.employee.hireDate = parsedDate.toISOString().split('T')[0];
              } else {
                this.employee.hireDate = ''; 
              }
            }

            const existingPhoto = this.employee.imageURL || this.employee.imageUrl || this.employee.photo || this.employee.image;
            if (existingPhoto) {
              this.imagePreview = this.getPhotoUrl(existingPhoto);
            }
          }
        } catch (processingError) {
          console.error("DEBUG ERROR: Error parsing employee details:", processingError);
        } finally {
          this.loading = false; 
          this.cdr.detectChanges(); 
          console.log('DEBUG 6: Loading set to FALSE. UI forced to redraw.');
        }
      },
      error: (err: any) => {
        console.error('DEBUG ERROR: HTTP request failed:', err);
        this.loading = false;
        this.cdr.detectChanges(); 
        if (isPlatformBrowser(this.platformId)) {
          alert('Failed to load employee data');
        }
      },
      complete: () => {
        console.log('DEBUG 7: HTTP Request completed.');
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  getPhotoUrl(photoPath: string): string {
    if (!photoPath) return '';
    if (photoPath.startsWith('http')) return photoPath;
    return `${API_URL}/uploads/${photoPath}`;
  }

  onSubmit(): void {
    this.loading = true;

    const formData = new FormData();
    formData.append('firstName', this.employee.firstName);
    formData.append('lastName', this.employee.lastName);
    formData.append('email', this.employee.email);
    formData.append('phone', this.employee.phone || '');
    formData.append('department', this.employee.department);
    formData.append('jobTitle', this.employee.jobTitle);
    formData.append('hireDate', this.employee.hireDate);
    formData.append('status', this.employee.status);
    formData.append('salary', this.employee.salary || '0');

    if (this.selectedFile) {
      formData.append('imageURL', this.selectedFile, this.selectedFile.name); 
    }

    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeId, formData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/employees']);
        },
        error: (err: any) => {
          console.error(err);
          this.loading = false;
          if (isPlatformBrowser(this.platformId)) {
            alert('Failed to update employee.');
          }
        }
      });
    } else {
      this.employeeService.createEmployee(formData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/employees']);
        },
        error: (err: any) => {
          console.error(err);
          this.loading = false;
          if (isPlatformBrowser(this.platformId)) {
            alert('Failed to create employee.');
          }
        }
      });
    }
  }
}