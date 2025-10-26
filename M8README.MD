
CS 465 Module Eight Journal

Architecture:
This was my first experience working on both the frontend and backend of a web application. On the frontend, I used HTML, JavaScript, and Angular to make an admin-side single-page application (SPA). The SPA was dynamic, with components that updated without refreshing the whole page, which made it smoother and faster. For the customer-facing side, Express used templates to load trip data from the database, and handled the backend with server-side rendering. Backend data is stored in a NoSQL MongoDB database, which has a flexible, JSON-like structure that makes it easy to work with. Since our trip objects didn't always have the same fields, MongoDB's schema-less design was perfect.

Functionality:
JSON was a huge part of connecting the frontend and backend. Although JavaScript is a programming language, JSON is a data format. As the Angular app communicated with the Express API, it used JSON to pass trip details. I refactored the code several times throughout the project to make it cleaner and more reusable. For example, components like the trip card and trip listing were reused to display data consistently across the site. This not only reduced redundancy but made it much easier to maintain and scale the application

Testing:
Testing endpoints and requests helped me understand how data moves. Using different HTTP methods like GET, POST, and PUT helped make sure the API worked and returned the right status codes. Adding security for the admin login added another layer of testing, especially with authentication and protected routes. I learned how little mistakes can break communication between the frontend and backend. As a result, I got a better understanding of how testing, error handling, and security work together.

Reflection:
Coming into this class, I found myself at a crossroads: should I continue pursuing a career in software development, or focus my efforts on my new path in insurance brokerage? At times, I wonder if I’m getting too old for this field. Every day, younger and hungrier developers seem to appear, constantly learning, adapting, and innovating. In a way, it reminds me of software itself: what worked yesterday may not work today.

Technology moves fast. Just like how new phone models are released every year, software and hardware evolve at an even quicker pace. A program that ran smoothly a couple of years ago might not even launch today, even if it’s not that old. That’s part of the adventure, sometimes it takes only a few minutes to find a solution, while other times you can spend hours on a Saturday morning hunting down an older version that finally works.

When everything runs perfectly, it’s an incredible feeling of accomplishment. But when things go wrong, even a single misplaced character can throw your entire program into chaos. What looks like a quick fix can turn into hours or even days of troubleshooting.

It’s been a while since I last worked with HTML, and I was genuinely surprised by how much has changed. Handlebars were a pleasant discovery, and using MongoDB was fascinating. I especially liked how changes didn’t have to be made directly on the target server or computer.

Overall, this class was an interesting and sometimes frustrating experience, but one that reminded me why I’ve always been drawn to technology in the first place.
