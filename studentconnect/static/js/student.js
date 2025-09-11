document.addEventListener('DOMContentLoaded', () => {

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            document.body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // --- WELCOME PAGE MODAL LOGIC ---
    if (document.getElementById('welcome-page')) {
        const authModal = document.getElementById('auth-page');
        const openModalBtns = [document.getElementById('joinBtn'), document.getElementById('cta-join-btn')];
        const closeModalBtn = authModal.querySelector('.close-modal');

        const openModal = () => authModal.classList.add('active');
        const closeModal = () => authModal.classList.remove('active');

        openModalBtns.forEach(btn => btn?.addEventListener('click', openModal));
        closeModalBtn?.addEventListener('click', closeModal);
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) closeModal();
        });
    }

    // LOGIN/SIGNUP FORM LOGIC (now used inside modal on both pages)
    if (document.getElementById('auth-page')) {
        // Toggle Student/Organizer forms
        const studentToggle = document.getElementById('student-toggle');
        const organizerToggle = document.getElementById('organizer-toggle');
        const studentForms = document.getElementById('student-forms');
        const organizerForms = document.getElementById('organizer-forms');

        studentToggle.addEventListener('click', () => {
            studentToggle.classList.add('active');
            organizerToggle.classList.remove('active');
            studentForms.classList.remove('hidden');
            organizerForms.classList.add('hidden');
        });

        organizerToggle.addEventListener('click', () => {
            organizerToggle.classList.add('active');
            studentToggle.classList.remove('active');
            organizerForms.classList.remove('hidden');
            studentForms.classList.add('hidden');
        });

        // Switch between login/signup
        const studentLoginForm = document.getElementById('student-login-form');
        const signupForm = document.getElementById('signup-form');
        const showSignupLink = document.getElementById('show-signup');
        const showLoginLink = document.getElementById('show-login');

        showSignupLink.addEventListener('click', (e) => {
            e.preventDefault();
            studentLoginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        });

        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.classList.add('hidden');
            studentLoginForm.classList.remove('hidden');
        });

        // Organizer login/signup toggle
        const organizerLoginForm = document.getElementById('organizer-login-form');
        const organizerSignupForm = document.getElementById('organizer-signup-form');
        const showOrganizerSignupLink = document.getElementById('show-organizer-signup');
        const showOrganizerLoginLink = document.getElementById('show-organizer-login');

        showOrganizerSignupLink.addEventListener('click', (e) => {
            e.preventDefault();
            organizerLoginForm.classList.add('hidden');
            organizerSignupForm.classList.remove('hidden');
        });

        showOrganizerLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            organizerSignupForm.classList.add('hidden');
            organizerLoginForm.classList.remove('hidden');
        });

        // Show/hide password
        const togglePasswordIcons = document.querySelectorAll('.toggle-password');
        togglePasswordIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const passwordInput = icon.previousElementSibling;
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            });
        });
    }
    
    // --- DASHBOARD PAGE LOGIC ---
    if (document.getElementById('dashboard-page')) {

        // --- Event Data with Details and Images ---
        const allEvents = [
             {
                id: "aiml-workshop-2025",
                title: "AI & ML Revolution Workshop",
                category: "workshop",
                date: "Oct 5, 2025",
                participants: "50+",
                image: "https://images.unsplash.com/photo-1620712943543-2fd617224887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGFpfGVufDB8fHx8MTY1ODQyMjQwMw&ixlib=rb-1.2.1&q=80&w=400",
                details: {
                    description: "Dive deep into the world of Artificial Intelligence and Machine Learning. This hands-on workshop is designed for aspiring data scientists and AI enthusiasts. You'll learn the fundamentals, explore popular algorithms, and build your very own predictive model from scratch.",
                    topics: ["Intro to Python for Data Science (NumPy, Pandas)", "Supervised vs. Unsupervised Learning", "Building a Linear Regression Model", "Understanding Neural Networks", "Deploying a Simple ML Model with Flask"],
                    time: "10:00 AM - 4:00 PM IST",
                    mode: "Online (Zoom)",
                    price: "Free for students",
                    speaker: {
                        name: "Dr. Arjun Desai",
                        role: "Lead AI Scientist at TechNova",
                        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                }
            },
            {
                id: "hackathon-2025",
                title: "Innovate India Hackathon",
                category: "hackathon",
                date: "Sep 20-22, 2025",
                participants: "300+",
                image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxoYWNrYXRob258ZW58MHx8fHwxNjU4NDIyMzgw&ixlib=rb-1.2.1&q=80&w=400",
                details: {
                    description: "Join India's largest student hackathon! Solve real-world problems, build innovative solutions, and network with industry experts. Prizes for top teams!",
                    topics: ["Full-stack Development", "Mobile App Development", "Data Science Challenges", "Cybersecurity", "Blockchain"],
                    time: "Starts 9:00 AM IST",
                    mode: "Hybrid (Online & Bangalore)",
                    price: "Free",
                    speaker: { name: "Ms. Priya Sharma", role: "CTO, InnovateTech", avatar: "https://randomuser.me/api/portraits/women/44.jpg" }
                }
            },
            {
                id: "intern-2025",
                title: "Frontend Developer Internship",
                category: "internship",
                date: "3-Month Role",
                participants: "15 Applicants",
                image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fGludGVybnnoaXB8ZW58MHx8fHwxNjU4NDIyNDIz&ixlib=rb-1.2.1&q=80&w=400",
                 details: {
                    description: "Gain hands-on experience building user interfaces with a dynamic tech startup. Work with React, Vue, or Angular on real projects.",
                    topics: ["HTML/CSS/JavaScript", "React.js Ecosystem", "UI/UX Principles", "API Integration"],
                    time: "Full-time (9 AM - 5 PM)",
                    mode: "Remote",
                    price: "Paid Internship",
                    speaker: { name: "Mr. Raj Kumar", role: "Lead Frontend Engineer", avatar: "https://randomuser.me/api/portraits/men/65.jpg" }
                }
            },
            {
                id: "cloud-summit-2025",
                title: "Cloud Computing Summit",
                category: "techevent",
                date: "Nov 1, 2025",
                participants: "500+",
                image: "https://images.unsplash.com/photo-1587825140708-df876c12b44e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEyfHxlbnwwfHx8fDE2NTg0MjI0Mzc&lib=rb-1.2.1&q=80&w=400",
                details: {
                    description: "Explore the latest trends and innovations in cloud technology. Expert speakers will cover AWS, Azure, GCP, and serverless architectures.",
                    topics: ["Serverless Computing", "Cloud Security", "DevOps on Cloud", "Containerization (Docker, Kubernetes)", "Multi-cloud Strategies"],
                    time: "9:00 AM - 6:00 PM IST",
                    mode: "Hybrid (Online & Delhi)",
                    price: "₹500 (Student Discount Available)",
                    speaker: { name: "Dr. Anya Singh", role: "Cloud Architect, GlobalTech", avatar: "https://randomuser.me/api/portraits/women/72.jpg" }
                }
            }
        ];

        const eventGrid = document.getElementById('event-grid');
        const allPageSections = document.querySelectorAll('.page-content');
        const discoverPage = document.getElementById('discover-page');
        const detailsPage = document.getElementById('event-details-page');

        const renderEvents = (eventsToRender) => {
            if (!eventGrid) return;
            eventGrid.innerHTML = '';
            if (eventsToRender.length === 0) {
                 eventGrid.innerHTML = `<p>No events found matching your criteria.</p>`;
                 return;
            }
            eventsToRender.forEach(event => {
                const card = `
                    <div class="event-card">
                        <img src="${event.image}" alt="${event.title}" class="event-card-image">
                        <div class="event-card-content">
                            <div class="event-card-header">
                                <span class="event-card-tag">${event.category}</span>
                                <button class="bookmark-btn"><i class="far fa-bookmark"></i></button>
                            </div>
                            <h3>${event.title}</h3>
                            <p class="event-card-info"><i class="fas fa-calendar-alt"></i> ${event.date}</p>
                            <div class="event-card-footer">
                                <span class="participants"><i class="fas fa-users"></i> ${event.participants}</span>
                                <button class="view-details-btn" data-event-id="${event.id}">View Details</button>
                            </div>
                        </div>
                    </div>
                `;
                eventGrid.innerHTML += card;
            });
        };

        document.querySelectorAll('.sidebar-nav li').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.sidebar-nav li').forEach(item => item.classList.remove('active'));
                link.classList.add('active');
                const pageId = link.dataset.page + "-page";
                const pageElement = document.getElementById(pageId);
                if (pageElement) showPage(pageElement);
            });
        });

        const showPage = (pageToShow) => {
            allPageSections.forEach(page => page.classList.add('hidden'));
            pageToShow.classList.remove('hidden');
        };

        const showEventDetails = (eventId) => {
            const event = allEvents.find(e => e.id === eventId);
            if (!event || !event.details) {
                alert("Details for this event are not available yet.");
                return;
            }
            
            document.getElementById('details-title').textContent = event.title;
            document.getElementById('details-image').src = event.image;
            document.getElementById('details-description').textContent = event.details.description;
            document.getElementById('details-date').innerHTML = `<strong>Date:</strong> ${event.date}`;
            document.getElementById('details-time').innerHTML = `<strong>Time:</strong> ${event.details.time}`;
            document.getElementById('details-mode').innerHTML = `<strong>Mode:</strong> ${event.details.mode}`;
            document.getElementById('details-price').textContent = event.details.price;
            document.getElementById('details-speaker-name').textContent = event.details.speaker.name;
            document.getElementById('details-speaker-role').textContent = event.details.speaker.role;
            document.getElementById('details-speaker-avatar').src = event.details.speaker.avatar;
            
            const topicsList = document.getElementById('details-topics');
            topicsList.innerHTML = '';
            event.details.topics.forEach(topic => {
                topicsList.innerHTML += `<li>${topic}</li>`;
            });
            
            showPage(detailsPage);
        };
        
        if (eventGrid) {
            eventGrid.addEventListener('click', (e) => {
                if (e.target && e.target.matches('.view-details-btn')) {
                    const eventId = e.target.dataset.eventId;
                    showEventDetails(eventId);
                }
            });
        }
        
        document.getElementById('back-to-discover').addEventListener('click', () => {
            showPage(discoverPage);
        });

        // document.querySelectorAll('.sidebar-nav li').forEach(link => {
        //     link.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         document.querySelectorAll('.sidebar-nav li').forEach(item => item.classList.remove('active'));
        //         link.classList.add('active');
        //         const pageId = link.dataset.page + "-page";
        //         const pageElement = document.getElementById(pageId);
        //         if (pageElement) showPage(pageElement);
        //     });
        // });

        // --- Profile Page Logic ---
        const profileUploadInput = document.getElementById('profile-upload-input');
        const profilePicturePreview = document.getElementById('profile-picture-preview');

        if (profileUploadInput && profilePicturePreview) {
            profileUploadInput.addEventListener('change', () => {
                const file = profileUploadInput.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        profilePicturePreview.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        const saveProfileBtn = document.getElementById('save-profile-btn');

        //     saveProfileBtn.addEventListener('click', () => {
        //         const mobileNumber = document.getElementById('profile-mobile-input').value;
        //         localStorage.setItem('user_mobile', mobileNumber);

        //         const storedUser = JSON.parse(localStorage.getItem('student_user'));
        //         if (storedUser) {
        //             storedUser.mobile = mobileNumber;
        //             localStorage.setItem('student_user', JSON.stringify(storedUser));
        //         }
        //         alert('Profile updated successfully!');
        //     });
        // }

        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.dataset.category;
                const filtered = category === 'all' ? allEvents : allEvents.filter(e => e.category === category);
                renderEvents(filtered);
            });
        });

        const searchBar = document.getElementById('search-bar');
        if (searchBar) {
            searchBar.addEventListener('keyup', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredEvents = allEvents.filter(event => 
                    event.title.toLowerCase().includes(searchTerm) || 
                    event.category.toLowerCase().includes(searchTerm)
                );
                renderEvents(filteredEvents);
            });
        }

        setTimeout(() => renderEvents(allEvents), 500);
    }
});
