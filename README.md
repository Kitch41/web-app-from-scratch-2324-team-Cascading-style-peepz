This is a readme for the team project

## Introduction

Here you can find everything you need to know about the team application, from team 'Cascading style peepz'.

This application collects data from each team member's personal website, showcasing a preview of their website, additional information, and a link to their website.

## Process

First we checked which of the personal data was relevant, and which of the data we wanted to display on the team website. We ended up going for the theme of (favorite) animals. 

<!-- put the sketch here. -->
![prototype](/docs/images/sketch.jpg) 
![prototype](/docs/images/sketch2.jpg) 

The general idea, was to devide a page into sections for each member of the team to showcase their work.

So, we display each member's personal website, some information (including the animals) and we wanted some fun interaction/animation, so we added a waving stickmen with each of the face of our avatars.

![version_](/docs/images/version_.png)

## Data handling

We started with setting up the initial fetch function here.

```js
async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to get data from ${url}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
```

Here we fetch the individual data from the 'info.json' file from each of the members repositories.

```js
async function getAllData() {
    try {
        const stef = await fetchData("https://kitch41.github.io/Webapps-From-Scratch-23-24/info.json");
        const stephan = await fetchData("https://spacejump3.github.io/web-app-from-scratch-2324/info.json");
        const nicole = await fetchData("https://kaboutergeitje.github.io/web-app-from-scratch-2324/info.json");
        const mitchel = await fetchData("https://mitchel-ds.github.io/web-app-from-scratch-2324/info.json");


        const combinedData = [
            { name: "stef", data: stef },
            { name: "stephan", data: stephan },
            { name: "nicole", data: nicole },
            { name: "mitchel", data: mitchel }
        ];

        return combinedData;

    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
}
```

Here we fetch the data from our 'team.json' file. Also using the previous function for each member we grab the individual data and puts that data into the correct elements for each member.

```js
async function useData() {
    try {
        const fetchData = await getAllData();

        // Fetch team.json using the GitHub API
        const teamJsonResponse = await fetch('https://api.github.com/repos/Kitch41/web-app-from-scratch-2324-team-Cascading-style-peepz/contents/team.json');
        const teamJson = await teamJsonResponse.json();

        // Decode the base64-encoded content
        const teamJsonContent = atob(teamJson.content);

        // Parse the JSON content
        const teamData = JSON.parse(teamJsonContent);

        console.log(fetchData);

        fetchData.forEach((member, index) => {
            const fullName = member.data.firstName + ' ' + member.data.lastName;
            console.log(fullName);
        
            member.name = fullName;
        
            // Find the corresponding member in the team data
            const teamMember = teamData.members.find(teamMember => teamMember.name.toLowerCase() === member.data.firstName.toLowerCase());
        
            if (teamMember) {
                // Use the personalPage from the team data
                member.personalPage = teamMember.personalPage;
            } else {
                // Handle the case where team data for this member is not found
                console.error(`Team data not found for ${fullName}`);
            }
        });
        

        const nameElements = document.querySelectorAll('[data-name]');
        const ageElements = document.querySelectorAll('[data-age]');
        const bioElements = document.querySelectorAll('[data-bio]');
        const petsElements = document.querySelectorAll('[data-pets]');
        const hobbiesElements = document.querySelectorAll('[data-hobbies]');
        const visitElements = document.querySelectorAll('[data-visit]');
        const headElements = document.querySelectorAll('.head');

        headElements.forEach((element, index) => {
            // Access the avatar_url property within the data object
            const head = fetchData[index].data.avatar_url;
            element.style.backgroundImage = `url(${head})`;
        });

        nameElements.forEach((element, index) => {
            // Access the name property set earlier
            const name = fetchData[index].name;
            element.innerHTML = name;
        });

        ageElements.forEach((element, index) => {
            // Access the age property within the data object
            const age = fetchData[index].data.age;
            const ageAsString = age ? age.toString() : '';
            element.innerHTML = ageAsString;
        });

        bioElements.forEach((element, index) => {
            // Access the bio property within the data object
            const bio = fetchData[index].data.bio;
            element.innerHTML = bio;
        });

        petsElements.forEach((element, index) => {
            // Access the favouriteAnimal property within the data object
            const pets = fetchData[index].data.favouriteAnimal;
            element.innerHTML = pets;
        });

        hobbiesElements.forEach((element, index) => {
            // Access the hobbies property within the data object
            const hobbies = fetchData[index].data.hobbies.join(', '); // Assuming hobbies is an array
            element.innerHTML = hobbies;
        });

        visitElements.forEach((element, index) => {
            // Access the personalPage property set earlier
            const personalPage = fetchData[index].personalPage;
            console.log(personalPage);
            if (personalPage) {
                element.href = personalPage;
                element.innerHTML = "Visit " + fetchData[index].data.firstName + "'s Page";
            } else {
                element.style.display = 'none'; // Hide the button if personalPage is not available
            }
        });

        sectionfixes();
    } catch (error) {
        console.error("Error using data:", error);
    }
}
```

## Personal websites

Here some information about each website.

### Stephan 

We started off with the idea of making a website about hobby's, so I immediately thought of something to do with movies. I also knew there was some kind of movie API so I decided to go for it. I wanted to make the site very personal and tried to incorporate some visual ideas. For example, the carrousel is designed after a filmstrip and the loading icon is a shutter. With the Open Movie Database API I could add my movies and also pick and choose what information I wanted to display. In the end I made a very simple website showcasing some of my favourite movies.

### Nicole

I wanted to make a portfolio. I wasn't completely sure where I wanted to go with it and didn't want to waste too much time on designing instead of coding, so I kept the design simple and I changed my idea about what it was going to be as I was coding it. Now it's just a preview of the projects I worked on without much information.

### Stef

### Mitchel

So, my idea for my personal website was to make something practical, which I could continue to improve and use even after this project. I needed to still make a portofolio for my website, so I wanted to make something simple for now. It has the general starting layout with landing page that I wanted, and using the Github REST API I showcase some of my work/repositories.
