// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get the form element
  const form = document.getElementById('contact-form')

  // Add submit event listener to the form
  form.addEventListener('submit', function (event) {
    // Prevent form from submitting by default
    event.preventDefault()

    // Get form fields
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const phone = document.getElementById('phone')
    const message = document.getElementById('message')

    // Flag to track validation status
    let isValid = true

    // Validate name
    if (!validateField(name, /^[A-Za-z]{2,}(?: [A-Za-z]{1,})*$/)) {
      isValid = false
    }

    // Validate email
    if (
      !validateField(email, /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      isValid = false
    }

    // Validate phone
    if (
      !validateField(
        phone,
        /^(\+\d{1,3}[- ]?)?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
      )
    ) {
      isValid = false
    }

    // Validate message (just checking length)
    if (message.value.trim().length < 10) {
      message.classList.add('is-invalid')
      message.nextElementSibling.style.display = 'block'
      isValid = false
    } else {
      message.classList.remove('is-invalid')
      message.nextElementSibling.style.display = 'none'
    }

    // If all validations pass, submit the form
    if (isValid) {
      form.submit()
    }
  })

  // Function to validate a field with regex
  function validateField(field, regex) {
    const feedback = field.nextElementSibling

    if (!regex.test(field.value)) {
      field.classList.add('is-invalid')
      feedback.style.display = 'block'
      return false
    } else {
      field.classList.remove('is-invalid')
      feedback.style.display = 'none'
      return true
    }
  }

  // Add input event listeners for real-time validation
  const inputs = form.querySelectorAll('input[required], textarea[required]')
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      // Validate the field as the user types
      if (input.id === 'name') {
        validateField(input, /^[A-Za-z]{2,}(?: [A-Za-z]{1,})*$/)
      } else if (input.id === 'email') {
        validateField(input, /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      } else if (input.id === 'phone') {
        validateField(
          input,
          /^(\+\d{1,3}[- ]?)?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
        )
      } else if (input.id === 'message') {
        if (input.value.trim().length < 10) {
          input.classList.add('is-invalid')
        } else {
          input.classList.remove('is-invalid')
        }
      }
    })
  })
})
