export {displayTargets};

// Function that DISPLAYS with an overlay the Sub-targets of each goal
function displayTargets(targets) {
    const targetsWrapperElem = document.querySelector('#text');
      
    targetsWrapperElem.innerHTML = ''; 
    const realTargets = targets[0].targets;

    for (let realTarget of realTargets) {

        console.log('subcode: ', realTarget);

        const codeTargetElem = document.createElement('h3');
        codeTargetElem.innerHTML = 'Code: ' + realTarget.code;
        targetsWrapperElem.append(codeTargetElem);

        const descriptionTargetElem = document.createElement('p');
        descriptionTargetElem.innerHTML = 'Description: ' + realTarget.description;
        targetsWrapperElem.append(descriptionTargetElem);
    }

}

// function that closes the overlay window with targets
  document.querySelector('#close').addEventListener('click', function() {
    document.getElementById("overlay").style.display = "none";
  });