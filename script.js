// ===== THEME INITIALIZATION (Forced Light) =====
document.documentElement.setAttribute('data-theme', 'light');
localStorage.setItem('theme', 'light');

// ===== MOBILE NAV =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

// ===== SKILL BARS =====
const skillBars = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== TYPEWRITER =====
const typeEl = document.querySelector('.hero-typewriter');
if (typeEl) {
  const phrases = [
    'ICT Lecturer & Educator',
    'Web Developer & Programmer',
    'Tech Enthusiast & Innovator',
    'Digital Learning Advocate',
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (deleting) {
      charIdx--;
    } else {
      charIdx++;
    }
    typeEl.innerHTML = current.slice(0, charIdx) + '<span class="cursor"></span>';

    let delay = deleting ? 60 : 100;
    if (!deleting && charIdx === current.length) {
      delay = 2000;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();
}

// ===== CONTACT FORM =====
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name', min: 2, msg: 'Name must be at least 2 characters.' },
      { id: 'email', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Enter a valid email address.' },
      { id: 'message', min: 10, msg: 'Message must be at least 10 characters.' },
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const errorEl = document.getElementById(f.id + 'Error');
      const val = input.value.trim();
      let err = '';

      if (!val) {
        err = 'This field is required.';
      } else if (f.min && val.length < f.min) {
        err = f.msg;
      } else if (f.pattern && !f.pattern.test(val)) {
        err = f.msg;
      }

      if (err) {
        input.classList.add('error');
        errorEl.textContent = err;
        errorEl.style.display = 'block';
        valid = false;
      } else {
        input.classList.remove('error');
        errorEl.style.display = 'none';
      }
    });

    if (valid) {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value || 'New Inquiry';
      const message = document.getElementById('message').value;

      // Construct WhatsApp Message
      const whatsappMessage = `Hello Kamran!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Subject:* ${encodeURIComponent(subject)}%0A*Message:* ${encodeURIComponent(message)}`;
      
      const whatsappURL = `https://wa.me/8801680863965?text=${whatsappMessage}`;

      // Show success message briefly before redirecting
      const success = document.querySelector('.form-success');
      success.textContent = "Redirecting to WhatsApp...";
      success.style.display = 'block';
      
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        contactForm.reset();
        success.style.display = 'none';
      }, 1500);
    }
  });
}

// ===== BLOG DATA =====
const blogPosts = [
  {
    id: 1,
    emoji: '💡',
    tag: 'ICT Education',
    title: 'Why ICT Education Matters More Than Ever in Bangladesh',
    excerpt: 'Exploring the transformative role of ICT in modern Bangladeshi education and why every student deserves access to quality digital skills training.',
    date: 'Dec 10, 2024',
    readTime: '5 min read',
    link: 'blog-ict-education.html',
  },
  {
    id: 2,
    emoji: '🌐',
    tag: 'Web Development',
    title: 'Getting Started with HTML & CSS: A Beginner\'s Roadmap',
    excerpt: 'A structured guide for complete beginners to start their web development journey with practical examples and project ideas.',
    date: 'Nov 22, 2024',
    readTime: '8 min read',
    link: 'blog-web-development.html',
  },
  {
    id: 3,
    emoji: '🤖',
    tag: 'AI & Technology',
    title: 'Artificial Intelligence in the Classroom: Opportunities & Challenges',
    excerpt: 'How educators can embrace AI tools to enhance learning outcomes while navigating ethical considerations in academic settings.',
    date: 'Oct 15, 2024',
    readTime: '6 min read',
    link: 'blog-ai-technology.html',
  },
  {
    id: 4,
    emoji: '🔐',
    tag: 'Cybersecurity',
    title: 'Digital Safety Essentials for Students and Educators',
    excerpt: 'Practical cybersecurity tips every student and teacher should know to stay safe in an increasingly connected digital world.',
    date: 'Sep 30, 2024',
    readTime: '4 min read',
    link: 'blog-cybersecurity.html',
  },
  {
    id: 5,
    emoji: '📊',
    tag: 'Database',
    title: 'Understanding Database Management: From Theory to Practice',
    excerpt: 'A comprehensive look at database fundamentals, SQL queries, and how databases power modern applications.',
    date: 'Sep 5, 2024',
    readTime: '7 min read',
    link: 'blog-database.html',
  },
  {
    id: 6,
    emoji: '🚀',
    tag: 'Career',
    title: 'Building a Career in Tech: Advice for Students in Bangladesh',
    excerpt: 'Guidance for students looking to enter the tech industry — from skill building to job hunting in the local and global market.',
    date: 'Aug 18, 2024',
    readTime: '9 min read',
    link: 'blog-career.html',
  },
];

// ===== COURSES DATA =====
const courses = [
  {
    icon: '🖥️',
    title: 'ICT Fundamentals for SSC Students',
    desc: 'A comprehensive course covering all chapters of the SSC ICT curriculum — from computer basics to programming and internet safety.',
    duration: '48 Hours',
    level: 'Beginner',
    link: 'course-ssc-ict.html',
  },
  {
    icon: '🌐',
    title: 'Web Design & Development with HTML/CSS',
    desc: 'Learn to build modern, responsive websites from scratch using HTML5 and CSS3 with real-world projects.',
    duration: '36 Hours',
    level: 'Beginner',
    link: 'course-frontend.html',
  },
  {
    icon: '📱',
    title: 'Android App Development Course',
    desc: 'Build modern Android applications from scratch. Covers the complete process from UI design to publishing on Play Store.',
    duration: '24 Hours',
    level: 'All Levels',
    link: 'course-android.html',
  },
];

// ===== PROJECTS DATA =====
const projects = [
  {
    emoji: '📚',
    title: 'EduTrack — Student Progress Portal',
    desc: 'A web-based student management system for tracking academic performance, attendance, and assignments across all classes.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    demo: 'project-edutrack.html',
    color: 'linear-gradient(135deg, #6c63ff22, #ff658422)',
  },
  {
    emoji: '🧠',
    title: 'ICT Quiz Master',
    desc: 'An interactive quiz platform for ICT students with timed questions, instant feedback, leaderboards, and performance analytics.',
    tech: ['React', 'Tailwind CSS', 'Firebase', 'Node.js'],
    demo: 'project-quiz.html',
    color: 'linear-gradient(135deg, #43e97b22, #38f9d722)',
  },
  {
    emoji: '🌐',
    title: 'School Resource Hub',
    desc: 'A centralized digital resource portal for Educare School — hosting lecture notes, past papers, video lessons, and study guides.',
    tech: ['Next.js', 'Supabase', 'Tailwind CSS'],
    demo: 'project-resource-hub.html',
    color: 'linear-gradient(135deg, #f9c74f22, #f77f0022)',
  },
  {
    emoji: '🔐',
    title: 'CyberSafe Awareness App',
    desc: 'A gamified cybersecurity awareness app teaching students about online threats, password security, and safe browsing habits.',
    tech: ['Vue.js', 'CSS3', 'Netlify'],
    demo: '#',
    status: 'Going On',
    color: 'linear-gradient(135deg, #ff658422, #6c63ff22)',
  },
  {
    emoji: '📊',
    title: 'Grade Calculator Tool',
    desc: 'An easy-to-use web tool for SSC/HSC students to calculate their GPA, predict results, and plan study goals.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: '#',
    status: 'Going On',
    color: 'linear-gradient(135deg, #38f9d722, #43e97b22)',
  },
  {
    emoji: '🗂️',
    title: 'Digital Classroom Notes',
    desc: 'A Markdown-based notes platform where students can access organized ICT chapter notes, diagrams, and revision tips.',
    tech: ['Gatsby', 'MDX', 'Styled Components'],
    demo: '#',
    status: 'Going On',
    color: 'linear-gradient(135deg, #6c63ff22, #43e97b22)',
  },
];

// ===== RENDER BLOG POSTS =====
function renderBlogs() {
  const container = document.querySelector('#blogGrid');
  if (!container) return;
  container.innerHTML = blogPosts.map(post => `
    <div class="card blog-card reveal">
      <div class="blog-card-img">${post.emoji}</div>
      <span class="blog-tag">${post.tag}</span>
      <h3 class="blog-title">${post.title}</h3>
      <p class="blog-excerpt">${post.excerpt}</p>
      <div class="blog-meta">
        <span>${post.date} · ${post.readTime}</span>
        <a class="read-more" href="${post.link}">Read More →</a>
      </div>
    </div>
  `).join('');
  // Re-observe new elements
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ===== RENDER COURSES =====
function renderCourses() {
  const container = document.querySelector('#coursesGrid');
  if (!container) return;
  const levelColor = { 'Beginner': 'badge-green', 'Intermediate': 'badge-orange', 'All Levels': 'badge-blue' };
  container.innerHTML = courses.map(c => `
    <div class="card course-card reveal">
      <div class="course-icon">${c.icon}</div>
      <h3 class="course-title">${c.title}</h3>
      <p class="course-desc">${c.desc}</p>
      <div class="course-meta">
        <span class="badge badge-blue">⏱ ${c.duration}</span>
        <span class="badge ${levelColor[c.level] || 'badge-blue'}">◈ ${c.level}</span>
      </div>
      <a href="${c.link}" class="btn btn-outline btn-sm">Explore Course →</a>
    </div>
  `).join('');
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ===== RENDER PROJECTS =====
function renderProjects() {
  const container = document.querySelector('#projectsGrid');
  if (!container) return;
  container.innerHTML = projects.map(p => `
    <div class="card project-card reveal">
      <div class="project-thumb" style="background: ${p.color}">
        ${p.emoji}
        ${p.status === 'Going On' ? '<span class="project-status-badge">Going On</span>' : ''}
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="tech-stack">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
        <div class="project-links">
          ${p.status === 'Going On' ? 
            '<button class="btn btn-outline btn-sm" disabled style="opacity:0.6; cursor:not-allowed;">🚧 In Development</button>' : 
            `<a href="${p.demo}" class="btn btn-primary btn-sm">🔗 Live Demo</a>`
          }
        </div>
      </div>
    </div>
  `).join('');
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderBlogs();
  renderCourses();
  renderProjects();
});

// ===== NAV SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (nav) {
    nav.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.3)' : 'none';
  }
});
