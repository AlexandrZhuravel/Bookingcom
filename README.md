### Automated testing of the "https://www.booking.com/" service

**1. Tools used:**

	- Cypress version 13.6.2
	- Yarn version 1.22.15
	- Google Chrome version 120
	- Node version 18.17.0
	
**2. Running the test framework:**

	2.1.Clone the repository with the command "git clone https://github.com/AlexandrZhuravel/Bookingcom.git"
	2.2.Run the autotests with the command "yarn cypress open" or "npm run cypress:open" or "npm run cypress:run"
	
**3. What I didn't have time to do:**

	3.1.Finish developing the completeCaptcha command in "commands.js" for passing the captcha on the page "https://account.booking.com/sign-in/password."
	As a result, autotests that use authorization may not work stably.
	3.2.Develop stable tests in "02.search.cy.js" for testing the search function.
	I planned to develop positive and negative tests for testing the functionality of the filters "Where are you going?", "Check-in date - Check-out date" and "occupancy".
	3.3.The ability to connect to a CI/CD pipeline.
