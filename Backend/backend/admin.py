from django.contrib import admin
from .models import Job, Application

class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'location', 'salary_range', 'posted_at')
    list_filter = ('company', 'location', 'posted_at')
    search_fields = ('title', 'company', 'description')
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        # Filter jobs to show only those created by the logged-in user
        return qs.filter(created_by=request.user)
    
    def save_model(self, request, obj, form, change):
        if not change:  # If creating new job
            obj.created_by = request.user
        super().save_model(request, obj, form, change)

class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('applicant', 'job', 'job_company', 'status', 'applied_at', 'view_resume')
    list_filter = ('status', 'applied_at')
    search_fields = ('applicant__username', 'applicant__email', 'job__title')
    readonly_fields = ('applicant', 'job', 'applied_at', 'resume', 'cover_letter', 'phone', 'linkedin')
    
    def job_company(self, obj):
        return obj.job.company
    job_company.short_description = 'Company'
    
    def view_resume(self, obj):
        if obj.resume:
            return f'<a href="{obj.resume.url}" target="_blank">Download Resume</a>'
        return 'No resume'
    view_resume.allow_tags = True
    view_resume.short_description = 'Resume'
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        # Filter applications to show only those for jobs created by the logged-in user
        return qs.filter(job__created_by=request.user)
    
    def has_add_permission(self, request):
        # Company admins cannot create applications
        return False
    
    def has_delete_permission(self, request, obj=None):
        # Company admins cannot delete applications
        return request.user.is_superuser

admin.site.register(Job, JobAdmin)
admin.site.register(Application, ApplicationAdmin)