document.addEventListener('DOMContentLoaded', () => {
  // GALLERY FILTER FUNCTIONALITY
  const filterButtons = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      workItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // CONTACT FORM SUBMISSION HANDLING
  const form = document.querySelector('.contact-form');
  const responseBox = document.getElementById('form-response');

  if (form && responseBox) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const action = form.getAttribute('action');

      fetch(action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          form.reset();
          responseBox.innerHTML = "<p class='form-success'>Thanks for your message! We'll be in touch soon.</p>";
        } else {
          responseBox.innerHTML = "<p class='form-error'>Oops! Something went wrong. Please try again later.</p>";
        }
      })
      .catch(() => {
        responseBox.innerHTML = "<p class='form-error'>Network error. Please check your connection and try again.</p>";
      });
    });
  }
});

