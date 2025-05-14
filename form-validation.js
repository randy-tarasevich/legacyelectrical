// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get the form element
  const form = document.getElementById('contact-form')
  // Get the form errors container
  const formErrors = document.getElementById('form-errors')

  // Store the original form action and redirect
  const formAction = form.action
  const redirectUrl = form.querySelector('input[name="redirect"]').value

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

    // If all validations pass, show success message and submit the form
    if (isValid) {
      try {
        // Show success message
        const successMessage = document.createElement('div')
        successMessage.className = 'alert alert-success mt-3'
        successMessage.role = 'alert'
        successMessage.textContent =
          'Thank you! The form has been submitted successfully. We will reply to you soon!'

        formErrors.innerHTML = ''
        formErrors.appendChild(successMessage)

        // Temporarily modify the form to prevent redirect
        form.querySelector('input[name="redirect"]').value = ''

        // Submit the form using the native form submission
        // Use a timeout to allow the success message to be seen
        setTimeout(() => {
          // Create a hidden iframe for submission
          const iframe = document.createElement('iframe')
          iframe.name = 'hidden_iframe'
          iframe.style.display = 'none'
          document.body.appendChild(iframe)

          // Set the form to target the iframe
          form.target = 'hidden_iframe'

          // Submit the form
          form.submit()

          // Reset the form after submission
          setTimeout(() => {
            form.reset()

            // Optional - redirect after a delay
            if (redirectUrl) {
              setTimeout(() => {
                window.location.href = redirectUrl
              }, 1000)
            }
          }, 500)
        }, 1000)
      } catch (error) {
        console.error('Error:', error)

        // Show error message
        const errorMessage = document.createElement('div')
        errorMessage.className = 'alert alert-danger mt-3'
        errorMessage.role = 'alert'
        errorMessage.textContent = 'Form submission failed!'

        formErrors.innerHTML = ''
        formErrors.appendChild(errorMessage)

        // Restore original form attributes
        form.action = formAction
        form.querySelector('input[name="redirect"]').value = redirectUrl
      }
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
