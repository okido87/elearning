/**
 * Bizbooks Elearning - Main JavaScript File
 *
 * This file contains all the client-side interactivity for the application.
 * It is organized into sections, each handling a specific page or component.
 * The entire script is wrapped in a 'DOMContentLoaded' event listener to ensure
 * the HTML is fully loaded before the script runs.
 */

document.addEventListener('DOMContentLoaded', function() {

    // --------------------------------------------------------------------
    // SECTION 1: GLOBAL COMPONENTS (run on all pages)
    // --------------------------------------------------------------------

    /**
     * Handles the mobile sidebar toggle functionality.
     * When the hamburger icon is clicked, it shows or hides the sidebar.
     */
    function initializeSidebarToggle() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.querySelector('.sidebar');

        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });

            // Optional: Close sidebar when clicking outside of it on mobile
            document.addEventListener('click', (event) => {
                const isClickInsideSidebar = sidebar.contains(event.target);
                const isClickOnToggle = menuToggle.contains(event.target);
                if (sidebar.classList.contains('open') && !isClickInsideSidebar && !isClickOnToggle) {
                    sidebar.classList.remove('open');
                }
            });
        }
    }


    // --------------------------------------------------------------------
    // SECTION 2: DASHBOARD PAGE (runs only on index.html)
    // --------------------------------------------------------------------

    /**
     * Initializes the tab system for "Thành tựu" and "Tin nhắn" widgets.
     */
    function initializeDashboardTabs() {
        const tabContainer = document.getElementById('achievements-messages');
        if (!tabContainer) return; // Exit if not on the dashboard page

        const tabButtons = tabContainer.querySelectorAll('.tab-btn');
        const tabContents = tabContainer.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to the clicked button and its corresponding content
                button.classList.add('active');
                const targetTabId = 'tab-' + button.dataset.tab;
                const targetTabContent = document.getElementById(targetTabId);
                if (targetTabContent) {
                    targetTabContent.classList.add('active');
                }
            });
        });
    }

    /**
     * Initializes the Chart.js line graph for monthly progress overview.
     */
    function initializeDashboardChart() {
        const ctx = document.getElementById('myChart');
        if (!ctx) return; // Exit if not on the dashboard page

        // Dummy data - In a real application, this would be fetched from the server.
        // Data can be from the `yearlytraining` table (d1, d2, d3, etc.)
        const chartData = {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
            scores: [8.2, 8.5, 9.0, 8.1, 8.8, 9.2]
        };
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Điểm trung bình hàng tháng',
                    data: chartData.scores,
                    borderColor: 'var(--primary-color)',
                    backgroundColor: 'rgba(29, 78, 216, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'var(--primary-color)',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'var(--primary-color)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        max: 10,
                        min: 7.5,
                        grid: {
                            color: '#e9e9e9',
                            borderDash: [3, 3]
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#333',
                        titleFont: { size: 14 },
                        bodyFont: { size: 12 },
                        padding: 10,
                        cornerRadius: 4,
                        callbacks: {
                            label: function(context) {
                                return `Điểm: ${context.raw}`;
                            }
                        }
                    }
                }
            }
        });
    }


    // --------------------------------------------------------------------
    // SECTION 3: MY COURSES PAGE (runs only on my-courses.html)
    // --------------------------------------------------------------------

    /**
     * Initializes the filtering logic for the course list.
     * Filters courses by "Tất cả", "Đang học", "Đã hoàn thành".
     */
    function initializeCourseFilter() {
        const filterBar = document.querySelector('.filter-bar');
        if (!filterBar) return; // Exit if not on the "My Courses" page

        const filterTabs = filterBar.querySelectorAll('.filter-tab');
        const courseCards = document.querySelectorAll('.course-card');

        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active state for tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filterValue = tab.getAttribute('data-filter');

                // Show/hide course cards based on the selected filter
                courseCards.forEach(card => {
                    const cardStatus = card.getAttribute('data-status');
                    if (filterValue === 'all' || filterValue === cardStatus) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --------------------------------------------------------------------
    // INITIALIZATION
    // Call all the functions to set up the page.
    // --------------------------------------------------------------------
    
    initializeSidebarToggle();
    initializeDashboardTabs();
    initializeDashboardChart();
    initializeCourseFilter();

});
