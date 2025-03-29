document.addEventListener('DOMContentLoaded', function() {
    // Terminal simulation
    const terminal = document.getElementById('terminal');
    if (!terminal) {
        console.error("Terminal element not found!");
        return;
    }

    const commands = [
        { text: 'whoami', response: '> jasvanth - ethical hacker | security researcher' },
        { text: 'skills', response: '> Kali Linux | Python | Wireshark | Metasploit | Burp Suite' },
        { text: 'projects', response: '> Malware Analysis | CTF Challenges | WiFi Scanner' },
        { text: 'contact', response: '> Email: jasvanth.c.2005@gmail.com | Phone: +91 8122064169' },
        { text: 'help', response: '> Available commands: whoami, skills, projects, contact, clear' },
        { text: 'clear', response: '' }
    ];

    let commandIndex = 0;
    let isTyping = false;

    function addTerminalLine(text) {
        const line = document.createElement('p');
        line.innerHTML = text;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }

    function simulateTyping() {
        if (isTyping) return;
        isTyping = true;

        if (commandIndex >= commands.length) {
            commandIndex = 0;
        }

        const command = commands[commandIndex];
        addTerminalLine(`> <span class="command">${command.text}</span>`);

        setTimeout(() => {
            if (command.text === 'clear') {
                terminal.innerHTML = `
                    <p>> System rebooted...</p>
                    <p>> Welcome back, hacker.</p>
                    <p>> Type <span class="command">'help'</span> for commands</p>
                    <p>> <span class="cursor">█</span></p>
                `;
            } else if (command.response) {
                addTerminalLine(command.response);
            }

            // Add new prompt
            addTerminalLine('> <span class="cursor">█</span>');

            commandIndex++;
            isTyping = false;

            if (commandIndex < commands.length) {
                setTimeout(simulateTyping, 2000);
            } else {
                commandIndex = 0;
                setTimeout(simulateTyping, 5000);
            }
        }, 1500);
    }

    // Hacker text effect in footer
    const hackerText = document.getElementById('hacker-text');
    if (hackerText) {
        const hackerPhrases = [
            "Accessing secure server...",
            "Scanning network...",
            "Firewall bypassed...",
            "Root access granted...",
            "Encryption cracked...",
            "System compromised..."
        ];
        
        let phraseIndex = 0;
        
        function changeHackerText() {
            hackerText.textContent = hackerPhrases[phraseIndex];
            phraseIndex = (phraseIndex + 1) % hackerPhrases.length;
            setTimeout(changeHackerText, 3000);
        }
        
        changeHackerText();
    }

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current section in navigation
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Start terminal simulation after initial delay
    setTimeout(simulateTyping, 3000);
});