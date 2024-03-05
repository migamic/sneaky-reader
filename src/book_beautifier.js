import JSZip from 'jszip';


function startRead(file, setBook) {

  if (file){
    getAsText(file, setBook);
  }

}

// Export the startRead function
export { startRead };

function getAsText(readFile, setBook) {

  var reader = new FileReader();

  reader.readAsArrayBuffer(readFile);

  // Handle progress, success, and errors
  reader.onprogress = updateProgress;
  reader.onload = function(evt) {
      loaded(evt, setBook);
  }
  reader.onerror = errorHandler;
}

function updateProgress(evt) {
  if (evt.lengthComputable) {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total);
    if (loaded < 1) {
      // Increase the prog bar length
      // style.width = (loaded * 200) + "px";
    }
  }
}

function parseTOC(tocContent) {
  // Use DOMParser to parse the XHTML content
  var parser = new DOMParser();
  var doc = parser.parseFromString(tocContent, "application/xhtml+xml");

  // Query all <a> elements in the document
  var links = doc.querySelectorAll("nav[*|type='toc'] a");
  var chapterFilenames = [];
  //console.log(links)
  var chapterNames = [];


  links.forEach(function(link) {
    //console.log(link.textContent)
    chapterNames.push(link.textContent)
    // Extract the href attribute, which contains the filename
    var href = link.getAttribute("href");
    // We split the href by '#' to ignore the fragment identifier
    var filename = href.split('#')[0];
    // Add filename to the array if it's not already included to avoid duplicates
    if (chapterFilenames.indexOf(filename) === -1) {
      chapterFilenames.push(filename);
    }
  });

  return {chapterNames, chapterFilenames};
}

function parseChapter(chapterContent) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(chapterContent, "application/xhtml+xml");

  var paragraphs = doc.querySelectorAll(" p");
  var par_texts = [];

  paragraphs.forEach(function(par) {
    par_texts.push(par.textContent)
  })
  //console.log(paragraphs)

  return par_texts
}



function loaded(evt, setBook) {
    // Create a new JSZip instance
    var zip = new JSZip();
    var contentPromises = []; // Use an array to store promises
    var toc_result_b = []
    // Load zip content as binary string
    zip.loadAsync(evt.target.result)
        .then(function(zip) {
            // First, read the TOC to get the list of chapters
            return zip.file("OEBPS/toc.xhtml").async("string");
        })
        .then(function(tocContent) {
            // Parse the TOC content to get an array of chapter filenames
            var toc_result = parseTOC(tocContent);
            toc_result_b = toc_result
            var chapterFilenames = toc_result.chapterFilenames;

            // Now, iterate through each chapter filename and extract its content
            chapterFilenames.forEach(function(filename) {
                var contentPromise = zip.file("OEBPS/" + filename).async("string");
                contentPromises.push(contentPromise);
            });

            // Wait for all chapter content promises to resolve
            return Promise.all(contentPromises);
        })
        .then(function(contents) {
            let book = { chapters: [] }; // Initialize book JSON structure

            contents.forEach(function(chapterContent, index) {
                let chapter = {
                    title: toc_result_b.chapterNames[index], // Adjusted variable name for clarity
                    paragraphs: []
                };

                var paragraphTexts = parseChapter(chapterContent);
                paragraphTexts.forEach(function(paragraphText) {
                    // Ensure tokenizeChapter and combineTokensRandomly functions exist and work as expected
                    const tokens = tokenizeChapter(paragraphText);
                    const newTokens = combineTokensRandomly(tokens);
                    var words = processParagraph(newTokens); // This should return an array of word objects

                    // Instead of directly pushing paragraph text, create an object with 'paragraph' as key
                    chapter.paragraphs.push({ content: words });
                });

                book.chapters.push(chapter);
                setBook(book); // Update the book object in context
            });

            //console.log(book)

            //exportToJsonFile(book); // Call function to export the book JSON
        })
        .catch(function(err) {
            // Handle any errors that occur during the process
            console.error("An error occurred:", err);
        });
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    // The file could not be read
  }
}


// Equivalent to Python's random.choice and random.randint
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function processSPattern(sPattern, tokens, pref) {
  let outWords = [{ word: pref, color: 'grey' }];
  for (let el of sPattern) {
    if (tokens.length === 0) {
      return [outWords, tokens];
    }
    if (el === 'x') {
      let token = tokens.shift(); // Removes the first element from tokens and returns it
      outWords.push({ word: token, color: 'red' });
    } else {
      outWords.push({ word: el, color: 'grey' });
    }
  }
  return [outWords, tokens];
}

function processPattern(pattern, tokens) {
  let outWords = [];
  let currentTab = "";
  let startLine = true;
  for (let el of pattern) {
    let pref = startLine ? currentTab : "";
    if (tokens.length === 0) {
      return [outWords, tokens];
    }
    if (el === 'x') {
      ///console.log(tokens)
      let token = tokens.shift();
      outWords.push({ word: pref + token, color: 'red' });
      startLine = false;
    } else if (el === 't') {
      currentTab += "    ";
    } else if (el === 's') {
      let nol = 5; // Replaces the random number of lines with a fixed value
      for (let i = 0; i < nol; i++) {
        if (tokens.length === 0) {
          break;
        }
        let randSPattern = getRandomInt(0, sPatterns.length - 1);
        let [nOutWords, newTokens] = processSPattern(sPatterns[randSPattern], tokens, pref);
        tokens = newTokens; // Update tokens after processing
        outWords.push(...nOutWords);
      }
      startLine = true;
      continue;
    } else if (el === 'u') {
      currentTab = currentTab.slice(0, -4);
    } else if (el === '\n') {
      outWords.push({ word: '\n', color: 'gray' });
      startLine = true;
      continue;
    } else {
      outWords.push({ word: pref + el, color: 'gray' });
      startLine = false;
    }
  }
  return [outWords, tokens];
}

function processParagraph(tokens) {
  let outWords = [];
  while (tokens.length) {
    let randPattern = getRandomInt(0, patterns.length - 1);
    let [nOutWords, newTokens] = processPattern(patterns[randPattern], tokens);
    tokens = newTokens;
    outWords.push(...nOutWords);
  }
  return outWords;
}

function combineTokensRandomly(tokens) {
  let combinedTokens = [];
  let i = 0;
  while (i < tokens.length) {
    if (Math.random() > 0.5 && i < tokens.length - 1) {
      combinedTokens.push(`${tokens[i]}_${tokens[i + 1]}`);
      i += 2;
    } else {
      combinedTokens.push(tokens[i]);
      i += 1;
    }
  }
  return combinedTokens;
}

function tokenizeChapter(chapter) {
  // Simple tokenization based on spaces; consider more sophisticated tokenization if needed
  return chapter.split(/\s+/);
}


const pattern_1 = ['@', 'x', '\n', 'def', 'x', '_', 'x', '( ', 'x', ':', 'x', ',', 'x', ':', 'x', ')', ':', '\n', 't', '\'\'\'', 'x', 'x', 'x', 'x', '\'\'\'', '\n', '    ', 's', '\n', 'return', 'x', '\n']

const pattern_2 = ['from', 'x', 'import', 'x', ',', 'x', ',', 'x', '\n', 'import', 'x', 'as', 'x', '\n', 'import', 'x', 'as', 'x', '\n', 'import', 'x',
'as', 'x', '\n']

const pattern_3 = ['for', 'x', 'in', 'x', ':', '\n', 't', 's']

const pattern_4 = ['class', 'x', '(', 'x', ')', ':', '\n', 't', 'def', '__init__(', 'x', ')', ':', '\n', 't', 's', 'u', 'def', 'x', '(', 'x', ')', ':', '\n', 't','s']

const pattern_5 = ['if', 'x', 'and', 'x', ':', '\n', 't', 's', 'u', 'elif', 'x', ':', '\n', 't', 's', 'u', 'else:', '\n', 't', 's']

const patterns = [pattern_1, pattern_2, pattern_3, pattern_4, pattern_5]

const s_pattern_1 = ['#', 'x', 'x', 'x', 'x', 'x', '\n']
const s_pattern_2 = ['x', '=', 'x', '\n']
const s_pattern_3 = ['x', '=', 'x', '+', 'x', '\n']
const s_pattern_4 = ['x', ',', 'x', '=', 'x', '()', '\n']

const sPatterns = [s_pattern_1, s_pattern_2, s_pattern_3, s_pattern_4]
