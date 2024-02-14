//Main-----------------Fetch JSON Api Data-------------------------------------------------------------------------------

useData()

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







    // const stefHead = document.getElementById("stefHead")
    // const stephanHead = document.getElementById("stephanHead")
    // const nicoleHead = document.getElementById("nicoleHead")
    // const mitchelHead = document.getElementById("mitchelHead")

    // stefHead.style.backgroundImage=`url(${.stef.avatar_url})`
    // stephanHead.style.backgroundImage=`url(${mdata.stephan.avatar_url})`
    // nicoleHead.style.backgroundImage=`url(${mdata.nicole.avatar_url})`
    // mitchelHead.style.backgroundImage=`url(${mdata.mitchel.avatar_url})`

    function sectionfixes() {
        const memberSection = document.querySelectorAll('.memberSection');
        const visitButton = document.querySelectorAll('[data-visit]');
    
        let membersArray = Array.from(memberSection);
        
        membersArray.forEach((section, index) => {
            const memberInfoUl = section.querySelector('ul');
            const visitButtonElement = visitButton[index];
    
            section.addEventListener('mouseover', function startWave() {
                section.querySelector('.rightArm').classList.add('wave');
                memberInfoUl.style.opacity = '1';
                visitButtonElement.style.opacity = '1'; // Make the button visible
            });
    
            section.addEventListener('mouseout', function startWave() {
                section.querySelector('.rightArm').classList.remove('wave');
                memberInfoUl.style.opacity = '0';
                visitButtonElement.style.opacity = '0'; // Make the button invisible
            });
    
            // const nameContainer = section.querySelector(`details:nth-of-type(${index}) p`)
            // nameContainer.innerHTML = section.firstName + section.lastName
        });
    }
 


    // memberSection.addEventListener('mouseover', function startWave() {
    //     document.querySelector('.rightArm').classList.add('wave')
    // })

    // memberSection.addEventListener('mouseout', function startWave() {
    //     document.querySelector('.rightArm').classList.remove('wave')
    // })

//     const mitchelName = document.getElementById("mitchelName")
//     const mitchelDOB = document.getElementById("mitchelDOB")
//     const mitchelBio = document.getElementById("mitchelBio")
//     const mitchelPets = document.getElementById("mitchelPets")
//     const mitchelHobbies = document.getElementById("mitchelHobbies")

//     mitchelName.innerHTML = mdata.mitchel.firstName + " " +  mdata.mitchel.lastName;
//     mitchelDOB.innerHTML = mdata.mitchel.age;
//     mitchelBio.innerHTML = mdata.mitchel.bio;
//     mitchelPets.innerHTML = mdata.mitchel.favouriteAnimal;
//     mitchelHobbies.innerHTML = mdata.mitchel.hobbies;    


//Main-----------------Animal API Data-------------------------------------------------------------------------------




  async function animalapi() {

      const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature");
      const animaldata = await response.json();
  
      // console log data from api
      console.log (animaldata);

    }


//Main-----------------Details-------------------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function() {
    const details = document.querySelectorAll("details");
  
    // Add the onclick listeners.
    details.forEach((detail) => {
      detail.addEventListener("toggle", () => {
        if (detail.open) setTargetDetail(detail);
      });
    });
  
    // Close all the details that are not targetDetail.
    function setTargetDetail(targetDetail) {
      details.forEach((detail) => {
        if (detail !== targetDetail) {
          detail.open = false;
        }
      });
    }
  });
  
