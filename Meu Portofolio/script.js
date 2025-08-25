// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Mobile menu toggle
function toggleMobileMenu() {
  const nav = document.querySelector(".nav")
  const btn = document.querySelector(".mobile-menu-btn")

  nav.style.display = nav.style.display === "flex" ? "none" : "flex"

  if (nav.style.display === "flex") {
    nav.style.position = "absolute"
    nav.style.top = "100%"
    nav.style.left = "0"
    nav.style.right = "0"
    nav.style.background = "white"
    nav.style.flexDirection = "column"
    nav.style.padding = "1rem"
    nav.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
    nav.style.borderTop = "1px solid #e2e8f0"
  }
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.querySelector(".nav")
    if (window.innerWidth <= 768) {
      nav.style.display = "none"
    }
  })
})

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections for scroll animations
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(section)
})

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)"
  })
})

document.querySelectorAll(".contact-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    const emojiMessage = btn.parentElement.querySelector(".emoji-message")
    if (emojiMessage) {
      emojiMessage.style.transform = "translateY(-2px) scale(1.05)"
    }
  })

  btn.addEventListener("mouseleave", () => {
    const emojiMessage = btn.parentElement.querySelector(".emoji-message")
    if (emojiMessage) {
      emojiMessage.style.transform = "translateY(0) scale(1)"
    }
  })
})

// Form validation (if you add a contact form later)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "1"
  document.body.style.transition = "opacity 0.5s ease"
})

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Add any initialization code here
  console.log("Portfólio carregado com sucesso!")

  const emojiMessages = document.querySelectorAll(".emoji-message")
  emojiMessages.forEach((message, index) => {
    message.style.animationDelay = `${0.2 + index * 0.2}s`
  })
})
