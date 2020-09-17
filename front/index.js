const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', login)

function login(e) {
  e.preventDefault()
  const email = e.target.email.value
  const password = e.target.password.value
  e.target.reset()
  console.log(email, password)
}