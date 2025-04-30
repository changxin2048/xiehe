document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainContent = document.querySelector('.main-content');

    // Ensure elements exist before proceeding
    if (!sidebar || !sidebarToggle || !mainContent) {
        console.error('Sidebar, toggle button, or main content element not found.');
        return;
    }

    const toggleIcon = sidebarToggle.querySelector('i');
    if (!toggleIcon) {
        console.error('Toggle icon element not found.');
        return;
    }

    // Function to set sidebar state
    const setSidebarState = (isCollapsed) => {
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
            // Add class to main content for margin adjustment (matches CSS)
            mainContent.style.marginLeft = '60px'; 
            toggleIcon.classList.remove('fa-chevron-left');
            toggleIcon.classList.add('fa-chevron-right');
            localStorage.setItem('sidebarCollapsed', 'true');
        } else {
            sidebar.classList.remove('collapsed');
            // Reset main content margin (matches CSS)
            mainContent.style.marginLeft = '220px'; 
            toggleIcon.classList.remove('fa-chevron-right');
            toggleIcon.classList.add('fa-chevron-left');
            localStorage.setItem('sidebarCollapsed', 'false');
        }
        // Adjust margin based on media query as well
        handleResize(); 
    };

    // Function to toggle sidebar state
    const toggleSidebar = () => {
        const isCollapsed = sidebar.classList.contains('collapsed');
        setSidebarState(!isCollapsed);
    };

    // Function to handle window resize and apply initial state based on screen width
    const handleResize = () => {
        const isSmallScreen = window.innerWidth <= 768;
        if (isSmallScreen) {
            // On small screens, sidebar is hidden by CSS, ensure main content has no margin
            mainContent.style.marginLeft = '0px';
            // Optionally hide the toggle button itself if desired via JS, though CSS handles it
            // sidebarToggle.style.display = 'none'; 
        } else {
            // On larger screens, restore state based on localStorage or default
            // sidebarToggle.style.display = 'flex'; // Ensure toggle is visible
            const savedState = localStorage.getItem('sidebarCollapsed') === 'true';
            setSidebarState(savedState);
        }
    };

    // Add click event listener to the toggle button
    sidebarToggle.addEventListener('click', toggleSidebar);

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Apply initial state on page load
    handleResize(); 
});