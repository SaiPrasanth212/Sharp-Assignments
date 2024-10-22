
Overview:

This project is a simple feedback management system where users can submit, edit, delete, and
view feedback. It consists of an HTML file (index.html) that provides the frontend structure, and a
JavaScript file (app.js) that handles API interactions and application logic. The project uses the
CrudCrud API to store and retrieve feedback, while Axios is used to manage the API requests.

Files Overview:
- index.html: Contains the structure and elements for user interaction.
- app.js: Contains the logic for handling feedback operations (CRUD operations) by interacting with
the backend API (CrudCrud).
index.html:

Key elements:
Overall Ratings Section:
Displays the number of feedbacks per rating (1 to 5 stars).
<div id="overall-ratings">
* 0<br>** 0<br>*** 0<br>**** 0<br>***** 0
</div>

Feedback Form:

Allows users to enter their name and rating, and submit the feedback.
<form onsubmit="submitFeedback(event)">
<input type="hidden" id="feedbackId" value="">
<div class="input-group">
<label for="name">Enter Your Name:</label>
<input type="text" id="name" required>
</div>
<label for="rating">Choose your rating:</label>
<select id="rating"> ... </select>
<button type="submit">Submit</button>
</form>

Feedback Display:
Displays all submitted feedback in a list format.
<div id="feedback-list"></div>

Scripts:
Axios is imported for handling API requests, and app.js is linked to provide functionality.
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="app.js"></script>
app.js:
This script handles API interactions, form submission, and dynamically updating the feedback and
ratings display.
API Base URL (line 1)
The project uses the CrudCrud API to store feedback data. The base URL for API interactions is:
const apiBaseUrl = 'https://crudcrud.com/api/bf0601675d2a4218a1fccc602846c136/feedbacks';

Window onload (line 4)
On page load, the functions displayFeedbacks() and displayOverallRatings() are called to load
existing feedback and overall ratings from the API.
window.onload = function () {
displayFeedbacks();
displayOverallRatings();
};

Form Submission and Feedback Handling:
submitFeedback() (line 9)
This function handles both the creation and updating of feedback:

Create Feedback:
If no feedback ID is provided, a new feedback is created via an HTTP POST request (line 27):
await axios.post(apiBaseUrl, { name: name, rating: rating });

Update Feedback:
If a feedback ID exists, it updates the feedback via an HTTP PUT request (line 19):
await axios.put(${apiBaseUrl}/${feedbackId}, { name: name, rating: rating });
Both operations refresh the feedback list and overall ratings after submission.
Feedback Display Functions:

displayFeedbacks() (line 35)

This function retrieves all feedback from the API using a GET request (line 41) and displays it in the
HTML element with the ID feedback-list. Each feedback entry includes "Edit" and "Delete" buttons,
allowing the user to update or remove feedback.
const response = await axios.get(apiBaseUrl);

deleteFeedback() (line 58)
Deletes a feedback item by its ID using the HTTP DELETE request (line 60). It then refreshes the
list of feedback and overall ratings.
await axios.delete(${apiBaseUrl}/${id});

editFeedback() (line 67)
Loads feedback into the form for editing by retrieving it using its ID (line 70) with an HTTP GET
request.
const response = await axios.get(${apiBaseUrl}/${id});

Overall Ratings Calculation:

displayOverallRatings() (line 78)
This function fetches all feedback from the API (line 80), counts the number of feedbacks per rating
(1 to 5 stars), and displays the counts in the overall-ratings div.
const response = await axios.get(apiBaseUrl);
The rating counts are stored in an object:
const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

Reset Form (line 93)
The form is reset after submission or updating, clearing out the input fields and resetting the rating
to its default value.

API Call Summary:

POST (Create Feedback): Line 27
PUT (Update Feedback): Line 19
GET (Retrieve All Feedback): Line 41
DELETE (Delete Feedback): Line 60
GET (Retrieve Single Feedback for Editing): Line 70
GET (Retrieve All Feedback for Overall Ratings): Line 80
