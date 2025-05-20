document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');
        });
    }
    
    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Sidebar navigation highlighting
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    
    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add table of contents generation
    const contentHeadings = document.querySelectorAll('.content h2, .content h3');
    const tocContainer = document.querySelector('.toc');
    
    if (tocContainer && contentHeadings.length > 0) {
        const tocList = document.createElement('ul');
        let currentList = tocList;
        let previousLevel = 2;
        
        contentHeadings.forEach((heading, index) => {
            const headingLevel = parseInt(heading.tagName.substring(1));
            const headingText = heading.textContent;
            const headingId = `heading-${index}`;
            
            // Add id to the heading for linking
            heading.setAttribute('id', headingId);
            
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${headingId}`;
            link.textContent = headingText;
            listItem.appendChild(link);
            
            // Handle nesting
            if (headingLevel > previousLevel) {
                const nestedList = document.createElement('ul');
                currentList.lastChild.appendChild(nestedList);
                currentList = nestedList;
            } else if (headingLevel < previousLevel) {
                // Go back up to the appropriate level
                for (let i = 0; i < previousLevel - headingLevel; i++) {
                    currentList = currentList.parentNode.parentNode;
                }
            }
            
            currentList.appendChild(listItem);
            previousLevel = headingLevel;
        });
        
        tocContainer.appendChild(tocList);
    }
    
    // Add syntax highlighting to code blocks
    document.querySelectorAll('pre code').forEach(block => {
        if (window.hljs) {
            hljs.highlightBlock(block);
        }
    });
});
