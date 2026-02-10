from django.core.management.base import BaseCommand
from django.contrib.auth.models import User, Permission
from django.contrib.contenttypes.models import ContentType
from backend.models import Job, Application

class Command(BaseCommand):
    help = 'Create company admin accounts'

    def handle(self, *args, **kwargs):
        companies = [
            {'username': 'google', 'email': 'admin@google.com', 'password': 'google123', 'company': 'Google'},
            {'username': 'microsoft', 'email': 'admin@microsoft.com', 'password': 'microsoft123', 'company': 'Microsoft'},
            {'username': 'amazon', 'email': 'admin@amazon.com', 'password': 'amazon123', 'company': 'Amazon'},
            {'username': 'meta', 'email': 'admin@meta.com', 'password': 'meta123', 'company': 'Meta'},
            {'username': 'apple', 'email': 'admin@apple.com', 'password': 'apple123', 'company': 'Apple'},
            {'username': 'netflix', 'email': 'admin@netflix.com', 'password': 'netflix123', 'company': 'Netflix'},
            {'username': 'accenture', 'email': 'admin@accenture.com', 'password': 'accenture123', 'company': 'Accenture'},
            {'username': 'ibm', 'email': 'admin@ibm.com', 'password': 'ibm123', 'company': 'IBM'},
            {'username': 'oracle', 'email': 'admin@oracle.com', 'password': 'oracle123', 'company': 'Oracle'},
            {'username': 'salesforce', 'email': 'admin@salesforce.com', 'password': 'salesforce123', 'company': 'Salesforce'},
            {'username': 'techcorp', 'email': 'admin@techcorp.com', 'password': 'techcorp123', 'company': 'TechCorp Inc'},
            {'username': 'datasoft', 'email': 'admin@datasoft.com', 'password': 'datasoft123', 'company': 'DataSoft Solutions'},
            {'username': 'cloudtech', 'email': 'admin@cloudtech.com', 'password': 'cloudtech123', 'company': 'CloudTech Systems'},
            {'username': 'designhub', 'email': 'admin@designhub.com', 'password': 'designhub123', 'company': 'DesignHub'},
            {'username': 'aiinnovations', 'email': 'admin@aiinnovations.com', 'password': 'aiinnovations123', 'company': 'AI Innovations'},
            {'username': 'mobilefirst', 'email': 'admin@mobilefirst.com', 'password': 'mobilefirst123', 'company': 'MobileFirst Inc'},
        ]

        # Get content types for Job and Application models
        job_content_type = ContentType.objects.get_for_model(Job)
        application_content_type = ContentType.objects.get_for_model(Application)

        # Get all permissions for Job and Application
        job_permissions = Permission.objects.filter(content_type=job_content_type)
        application_permissions = Permission.objects.filter(content_type=application_content_type)

        created_count = 0
        for company_data in companies:
            user, created = User.objects.get_or_create(
                username=company_data['username'],
                defaults={
                    'email': company_data['email'],
                    'is_staff': True,
                    'is_superuser': False,
                }
            )
            if created:
                user.set_password(company_data['password'])
                user.save()
                created_count += 1
                self.stdout.write(self.style.SUCCESS(
                    f"Created {company_data['company']} admin: {company_data['email']} / {company_data['password']}"
                ))
            
            # Grant permissions to manage Jobs and Applications
            user.user_permissions.add(*job_permissions)
            user.user_permissions.add(*application_permissions)
            user.save()

        if created_count > 0:
            self.stdout.write(self.style.SUCCESS(f'\nSuccessfully created {created_count} company admin accounts!'))
        else:
            self.stdout.write(self.style.WARNING('All company admin accounts already exist.'))
        
        self.stdout.write(self.style.SUCCESS('\nGranted permissions to all company admins!'))
        self.stdout.write(self.style.SUCCESS('\n=== Company Admin Logins ==='))
        self.stdout.write('Google: google / google123')
        self.stdout.write('Microsoft: microsoft / microsoft123')
        self.stdout.write('Amazon: amazon / amazon123')
        self.stdout.write('Meta: meta / meta123')
        self.stdout.write('Apple: apple / apple123')
        self.stdout.write('Netflix: netflix / netflix123')
        self.stdout.write('Accenture: accenture / accenture123')
        self.stdout.write('IBM: ibm / ibm123')
        self.stdout.write('Oracle: oracle / oracle123')
        self.stdout.write('Salesforce: salesforce / salesforce123')
        self.stdout.write('TechCorp Inc: techcorp / techcorp123')
        self.stdout.write('DataSoft Solutions: datasoft / datasoft123')
        self.stdout.write('CloudTech Systems: cloudtech / cloudtech123')
        self.stdout.write('DesignHub: designhub / designhub123')
        self.stdout.write('AI Innovations: aiinnovations / aiinnovations123')
        self.stdout.write('MobileFirst Inc: mobilefirst / mobilefirst123')
