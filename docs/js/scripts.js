//Main-----------------Fetch JSON Api Data-------------------------------------------------------------------------------



async function fetchdataStef() {
    try {
        const response = await fetch("https://kitch41.github.io/Webapps-From-Scratch-23-24/info.json");

        if (!response.ok) {
            throw new Error("Failed to get data from stef");
        }

        const data = await response.json();


        return data;

    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
}
fetchdataStef();

async function fetchdataNicole() {
    try {
        const response = await fetch("https://kaboutergeitje.github.io/web-app-from-scratch-2324/info.json");

        if (!response.ok) {
            throw new Error("Failed to get data from nicole");
        }

        const data = await response.json();


        return data;

    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
}
fetchdataNicole();

async function fetchdataStephan() {
    try {
        const response = await fetch("https://spacejump3.github.io/web-app-from-scratch-2324/info.json");

        if (!response.ok) {
            throw new Error("Failed to get data for stephan");
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
}

async function fetchdataMitchel() {
    try {
        const response = await fetch("https://mitchel-ds.github.io/web-app-from-scratch-2324/info.json");

        if (!response.ok) {
            throw new Error("Failed to get data for mitchel");
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
}

fetchdataMitchel();


  
async function getData() {

    

    const stef = await fetchdataStef();
    const stephan = await fetchdataStephan();
    const mitchel = await fetchdataMitchel();
    const nicole = await fetchdataNicole();
    
    
    const mdata = {
        stef,
        stephan,
        mitchel,
        nicole
    };

    const stefHead = document.getElementById("stefHead")
    const stephanHead = document.getElementById("stephanHead")
    const nicoleHead = document.getElementById("nicoleHead")
    const mitchelHead = document.getElementById("mitchelHead")

    stefHead.style.backgroundImage=`url(${mdata.stef.avatar_url})`
    stephanHead.style.backgroundImage=`url(${mdata.stephan.avatar_url})`
    nicoleHead.style.backgroundImage=`url(${mdata.nicole.avatar_url})`
    mitchelHead.style.backgroundImage=`url(${mdata.mitchel.avatar_url})`
    
    console.log(mdata);

    const memberSection = document.querySelectorAll('.memberSection');

    let membersArray = Array.from(memberSection);
    
    membersArray.forEach((section, index) => {
        const memberInfoUl = section.querySelector('ul');

        section.addEventListener('mouseover', function startWave() {
            section.querySelector('.rightArm').classList.add('wave');
            memberInfoUl.style.opacity = '1'
        });

        section.addEventListener('mouseout', function startWave() {
            section.querySelector('.rightArm').classList.remove('wave');
            memberInfoUl.style.opacity = '0'
        });

        // const nameContainer = section.querySelector(`details:nth-of-type(${index}) p`)

        // nameContainer.innerHTML = section.firstName + section.lastName
    });

    // memberSection.addEventListener('mouseover', function startWave() {
    //     document.querySelector('.rightArm').classList.add('wave')
    // })

    // memberSection.addEventListener('mouseout', function startWave() {
    //     document.querySelector('.rightArm').classList.remove('wave')
    // })
}




getData();


//Main-----------------Animal API Data-------------------------------------------------------------------------------




  async function animalapi() {

      const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature");
      const animaldata = await response.json();
  
      // console log data from api
      console.log (animaldata);

    }

    animalapi();

