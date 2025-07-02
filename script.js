document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Sidebar Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // --- Tab Functionality for Achievements & Messages ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button and corresponding content
            button.classList.add('active');
            const targetTab = document.getElementById('tab-' + button.dataset.tab);
            if(targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // --- Chart.js for Overview Dashboard ---
    const ctx = document.getElementById('myChart');
    if (ctx) {
        // Dữ liệu này sẽ được lấy từ bảng `yearlytraining` (các cột d1, d2, d3...)
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
                datasets: [{
                    label: 'Điểm trung bình hàng tháng',
                    data: [8.2, 8.5, 9.0, 8.1, 8.8, 9.2], // Dummy data
                    borderColor: 'var(--primary-color)',
                    backgroundColor: 'rgba(0, 82, 204, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
});
