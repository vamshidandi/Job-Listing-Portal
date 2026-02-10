from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from backend.models import Job

class Command(BaseCommand):
    help = 'Create sample jobs for testing'

    def handle(self, *args, **kwargs):
        # Create or get admin user
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@jobportal.com',
                'is_staff': True,
                'is_superuser': True
            }
        )
        if created:
            admin_user.set_password('admin123')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS('Created admin user (username: admin, password: admin123)'))

        # Sample jobs data
        jobs_data = [
            {
                'title': 'Senior Frontend Developer',
                'About': 'Join our team to build amazing user interfaces with React and modern web technologies.',
                'description': 'We are looking for an experienced Frontend Developer to join our growing team. You will be responsible for building responsive web applications using React, TypeScript, and modern CSS frameworks.\n\nResponsibilities:\n- Develop new user-facing features\n- Build reusable code and libraries\n- Ensure technical feasibility of UI/UX designs\n- Optimize applications for maximum speed\n- Collaborate with backend developers and designers',
                'salary_range': '$80k - $120k',
                'company': 'TechCorp Inc',
                'location': 'San Francisco, CA',
            },
            {
                'title': 'Full Stack Python Developer',
                'About': 'Work on cutting-edge projects using Django, React, and cloud technologies.',
                'description': 'We need a talented Full Stack Developer proficient in Python/Django and React. You will work on building scalable web applications and RESTful APIs.\n\nRequirements:\n- 3+ years of Python/Django experience\n- Strong knowledge of React and JavaScript\n- Experience with PostgreSQL or MySQL\n- Familiarity with AWS or Azure\n- Understanding of RESTful API design',
                'salary_range': '$90k - $130k',
                'company': 'DataSoft Solutions',
                'location': 'New York, NY',
            },
            {
                'title': 'DevOps Engineer',
                'About': 'Help us build and maintain robust CI/CD pipelines and cloud infrastructure.',
                'description': 'Join our DevOps team to manage and improve our infrastructure. You will work with Docker, Kubernetes, and various cloud platforms.\n\nKey Responsibilities:\n- Design and implement CI/CD pipelines\n- Manage cloud infrastructure (AWS/Azure/GCP)\n- Monitor system performance and reliability\n- Automate deployment processes\n- Ensure security best practices',
                'salary_range': '$95k - $140k',
                'company': 'CloudTech Systems',
                'location': 'Austin, TX',
            },
            {
                'title': 'UI/UX Designer',
                'About': 'Create beautiful and intuitive user experiences for our products.',
                'description': 'We are seeking a creative UI/UX Designer to join our design team. You will be responsible for creating user-centered designs and prototypes.\n\nWhat you will do:\n- Create wireframes, prototypes, and mockups\n- Conduct user research and usability testing\n- Design responsive interfaces for web and mobile\n- Collaborate with developers and product managers\n- Maintain design systems and style guides',
                'salary_range': '$70k - $110k',
                'company': 'DesignHub',
                'location': 'Los Angeles, CA',
            },
            {
                'title': 'Data Scientist',
                'About': 'Analyze complex data sets and build machine learning models to drive business insights.',
                'description': 'We are looking for a Data Scientist to help us make data-driven decisions. You will work with large datasets and build predictive models.\n\nRequirements:\n- Strong Python skills (pandas, numpy, scikit-learn)\n- Experience with machine learning algorithms\n- Knowledge of SQL and data visualization tools\n- Statistical analysis expertise\n- Excellent communication skills',
                'salary_range': '$100k - $150k',
                'company': 'AI Innovations',
                'location': 'Boston, MA',
            },
            {
                'title': 'Mobile App Developer',
                'About': 'Build native mobile applications for iOS and Android platforms.',
                'description': 'Join our mobile team to create amazing apps for millions of users. You will work with React Native or native technologies.\n\nResponsibilities:\n- Develop mobile applications for iOS and Android\n- Write clean, maintainable code\n- Integrate with RESTful APIs\n- Optimize app performance\n- Participate in code reviews',
                'salary_range': '$85k - $125k',
                'company': 'MobileFirst Inc',
                'location': 'Seattle, WA',
            },
        ]

        # Create jobs
        created_count = 0
        for job_data in jobs_data:
            job, created = Job.objects.get_or_create(
                title=job_data['title'],
                company=job_data['company'],
                defaults={
                    **job_data,
                    'created_by': admin_user
                }
            )
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created job: {job.title}'))

        if created_count > 0:
            self.stdout.write(self.style.SUCCESS(f'\nSuccessfully created {created_count} sample jobs!'))
        else:
            self.stdout.write(self.style.WARNING('All sample jobs already exist.'))
