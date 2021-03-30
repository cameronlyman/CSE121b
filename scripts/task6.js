
function checkGuessed(word, guessed, mw) {
    console.log("Checking letters:" + guessed);

    // Check that the letters that were wrong aren't in the list of candiates
    for (let letter of guessed){
        if (word.includes(letter)) {
            return false
        }
    }
    
    let known_letters = [];

    // Remove word if it suggests a letter that is known but is shown as unknown in the mystery word
    for (let i = 0; i < word.length; i++) {
        // Add to known letters if new letter
        if (known_letters.includes(word[i]) && mw[i] == '?') {
            return false;

        } else if (mw[i] != '?') {
            known_letters.push(mw[i]) // Push the letter that we have seen
        }
    }
    // Every letter passed
    return true
}

// Fetch the json I'm using
async function fetchText() {
    let response = await fetch('https://raw.githubusercontent.com/cameronlyman/CSE121b/main/words.json');
    let data = await response.json();

    let word = document.getElementById('mystery_word').value;
    let guessed = document.getElementById('letters').value;
    let letters_guessed = guessed.length;

    // This is the wrong way to do it, but I can't figure out promises in the time I have left

    // formmating for the regex and other stuff
    word = word.toLowerCase();
    let mystery_word = word;
    guessed = guessed.replace(/\W/g, '');
    guessed = guessed.toLowerCase();
    console.log(guessed);

    console.log(guessed)
    // Create regex
    let reg = word.replaceAll("?", "[a-z]");
    reg = new RegExp(reg);
    //guessed = new RegExp(guessed);

    let length = word.length;
    let stuff = data[length];
    // console.log(stuff);
     console.log(reg);
    let candidates = [];
    console.log(guessed);

    stuff.forEach(w => {
        // console.log(w);
        good = true;
        
        //console.log("reg:" + reg.test(w));
        //console.log("guess:" + guessed.test(w))
        // See if it fits the word so far

        

        if (reg.test(w)){
            if (checkGuessed(w, guessed, mystery_word)) {
                // console.log(w);
                candidates.push(w);
            }
        }
    });

    console.log(candidates);

    returnCandidates(candidates);
}

function returnCandidates(candidates) {
    
    // Clear the children that are alread there
    document.getElementById("possible_words").textContent = '';
    candidates.forEach(w => {
        let word = document.createElement("li");
        word.textContent = w;
        document.getElementById("possible_words").appendChild(word);
    })
}


// Find candidates
function findCandiates() {

    word = document.getElementById('mystery_word').value;

    console.log(word);

    // formmating for the regex
    word = word.toLowerCase();


    // Create regex
    reg = word.replace("?", "[a-z]");
    reg = "/" + reg + "/";

    length = word.length;
    console.log(length);

}

// Add event listeners
document.getElementById('check_possible_words').addEventListener('click', fetchText);