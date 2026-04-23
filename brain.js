
//03/4/2026, friday, now its 10:13pm, but i started CAISII4 a few minutes ago.
// 11:23pm. NO, i didnt stop. Ill save on "versions\caisii-04-1"

//11:53 AM do dia 04/04/2026, um sabado, agora 26 graus.
// Comecei aqui há um bom tempo (desde de manha), mas nao anotei.
// ESqueci q era em ingles. É 'confidencial'.
//5:35pm, maior parte das adicoes de hoje feitas. debug, voice...
//7:57pm. Vou falar mais no versions\caisii-04-02\theNote. Mas acabei com a
//funcao de calculo.
//8:07pm fiz o verificador de num no make sequence.

var talk = new ActiveXObject("SAPI.SpVoice")
var voices = talk.GetVoices()
talk.Voice = voices.Item(2)
talk.Rate = -5




var debugging = false
var voiceOn = false


var shell = new ActiveXObject("WScript.Shell")

var fso = new ActiveXObject("Scripting.FileSystemObject")


var hiDict = "..\\Dictionary\\hi.txt"
var hiAnswerDict = "..\\Dictionary\\hiAnswer.txt"
var symbolsDict = "..\\Dictionary\\symbols.txt"
var soriesDict = "..\\Dictionary\\soriesOfNoText.txt"
var stateGreetingsDict = "..\\Dictionary\\stateGreetings.txt"
var activeDict = "..\\Dictionary\\activeFunction.txt"
var prelocDict = "..\\Dictionary\\prelocations.txt"
var openingTextDict = "..\\Dictionary\\openingLoc.txt"
var placeInexistsDict = "..\\Dictionary\\placeDoesntExists.txt"
var mathOpenersDict = "..\\Dictionary\\math.txt"
var mathAnswersDict = "..\\Dictionary\\mathAnswers.txt"



var hiFile = fso.OpenTextFile(hiDict, 1)
var hiContent = hiFile.ReadAll()
hiFile.Close()
var hies = hiContent.split("'")


var hiAnswerFile = fso.OpenTextFile(hiAnswerDict, 1)
var hiAnswerContent = hiAnswerFile.ReadAll()
hiAnswerFile.Close()
var hiAnswers = hiAnswerContent.split("'")


var soriesFile = fso.OpenTextFile(soriesDict, 1)
var soriesContent = soriesFile.ReadAll()
soriesFile.Close()
var sories = soriesContent.split("[/]")

var stateGreetingsFile = fso.OpenTextFile(stateGreetingsDict, 1)
var stateGreetingsContent = stateGreetingsFile.ReadAll()
stateGreetingsFile.Close()
var stateGreetings = stateGreetingsContent.split("[/]")

var activeFile = fso.OpenTextFile(activeDict, 1)
var activeContent = activeFile.ReadAll()
activeFile.Close()
var actives = activeContent.split("'")

var prelocFile = fso.OpenTextFile(prelocDict, 1)
var prelocContent = prelocFile.ReadAll()
prelocFile.Close()
var locationsWithWords = prelocContent.split("/---/")

var openingFile = fso.OpenTextFile(openingTextDict, 1)
var openingContent = openingFile.ReadAll()
openingFile.Close()
var openingText = openingContent.split("[/]")

var placeDoesntExistsFile = fso.OpenTextFile(placeInexistsDict, 1)
var placeDoesntExistsContent = placeDoesntExistsFile.ReadAll()
placeDoesntExistsFile.Close()
var placeDoesntExists = placeDoesntExistsContent.split("'")

var mathOpenersFile = fso.OpenTextFile(mathOpenersDict, 1)
var mathOpenersContent = mathOpenersFile.ReadAll()
mathOpenersFile.Close()
var mathOpeners = mathOpenersContent.split("'")

var mathAnswersFile = fso.OpenTextFile(mathAnswersDict, 1)
var mathAnswersContent = mathAnswersFile.ReadAll()
mathAnswersFile.Close()
var mathAnswers = mathAnswersContent.split("'")





function applyParamsTo(phrase){
	
	phrase = phrase.toLowerCase()
	phrase = phrase.replace(/\s+/g," ")
    phrase = phrase.replace(/[^a-zA-Z0-9+\-*\/\s+]/g,"")
	
	
	
	
	var splitedPhrase = phrase.split(" ")
	var usefullPhrase = ""
	
	
	for(var wordNum = 0; wordNum < splitedPhrase.length; wordNum++){
		
		var word = splitedPhrase[wordNum]
		var lastLetter = ""
		var wordToKeep = ""
		
		for(var letterNum = 0; letterNum < word.length; letterNum++){
			
			var letter = word.charAt(letterNum)
			
            if(letter!=lastLetter){
				
				wordToKeep += letter
				
			}
			
			lastLetter = letter
			
		}
		
		usefullPhrase += wordToKeep + " "
		
	}
	
	
	return usefullPhrase
	
}









function checkNearityOf(word, baseWord){
	
	 var equals = 0
	 var min = Math.ceil(baseWord.length / 1.75)
	 var largest = ""
     if(word > baseWord){
		 largest = word
	 }else{
		 largest = baseWord
	 }

    for(var i = 0; i < largest.length; i++){
	

	var letterOfWord = word.charAt(i)  
     var letterOfBase = baseWord.charAt(i)
	 
	 if(letterOfBase == letterOfWord){
		 
		 equals += 1
		 
	 }
	
	
    }	
	
	if(equals >= min){
         return true
	}
	
	return false
	
}











function makeSequenceOf(phrase){
	
	var splitedPhrase = phrase.split(" ")
	
	var phraseToReturn = ""
	var greeted = false
	var openCommand = false
	var funct
	
	wordChecker:
	for(var i = 0; i < splitedPhrase.length; i++){
		if(debugging){
		WScript.Echo("///////////")
		}
        var word = splitedPhrase[i]
		if(Number(word)){
			if(debugging){
				var phraseBack = word + " é um numero, nao sera lido."
				justSay(phraseBack)
				say(phraseBack)
			}
			continue
		}
		if(word.length > 1){
		
		
		// greetin check start
		for(var greetNum = 0; greetNum < hies.length; greetNum++){
			
			
			var baseWord = hies[greetNum]
			var nearity = checkNearityOf(word, baseWord)
			
			if(debugging){
			WScript.Echo(baseWord + "-" + word + "-" + nearity)
			}
			
			if((word == baseWord || nearity) && !greeted){ // Greeting check
				
				phraseToReturn += hiAnswers[Math.floor(Math.random() * hiAnswers.length)]
				phraseToReturn += " " + stateGreetings[Math.floor(Math.random() * stateGreetings.length)] + " "
				greeted = true
				continue wordChecker
			}
			
			
		}
		// greetin check end
		
		// initiate check start
		for(var startNum = 0; startNum < actives.length; startNum++){
			
			var baseWord = actives[startNum]
			var nearity = checkNearityOf(word, baseWord)
			
			if(debugging){
			WScript.Echo(baseWord + "-" + word + "-" + nearity)
			}
			
			if(word == baseWord || nearity){
				
				openCommand = true
			continue wordChecker
			}
			
			
		}
		//initiate check end
		
		//location exisists start
		
		for(var locationsWithWordsNum = 0; locationsWithWordsNum < locationsWithWords.length; locationsWithWordsNum++){
			
			var actual = locationsWithWords[locationsWithWordsNum]
			var parts = actual.split("[d]")
            var callWords = parts[0].split(",")
			var address = parts[1]
			
			for(var callWordNum = 0; callWordNum < callWords.length; callWordNum++){
				
				var actualCallWord = callWords[callWordNum]
				var nearity = checkNearityOf(word, actualCallWord)
				
				if(debugging){
				WScript.Echo(actualCallWord + "-" + word + "-" + nearity)
				}				
				
				if(word == actualCallWord || nearity && openCommand && !funct){
					
					var openingTextText = openingText[Math.floor(Math.random() * openingText.length)]
					phraseToReturn += openingTextText + word
					funct = address
					
					if(debugging){
					WScript.Echo(address)
					}
					
					continue wordChecker
					
				}
				
			}
			
			if(funct){
				break
			}
			
		}
		
		// location e.end
		
		// math begin
		
		for(var mathNum = 0; mathNum < mathOpeners.length; mathNum++){
			
			var mathWord = String(mathOpeners[mathNum])
		
		if(debugging){
			WScript.Echo(mathWord + "-" + word)
		}
			
		if(mathWord == word){
			
			var num1 = Number(splitedPhrase[i - 1])
			var num2 = Number(splitedPhrase[i + 1])
			
			if(debugging){
				WScript.Echo("number1: " + num1 + "-number2: " + num2)
			}
			
			var result
			
			if(num1 && num2){
				   
				   if(word=="less" || word=="menos"){
					   
					   result = num1 - num2
					   say(num1  - num2)
					   
				   } else if(word=="plus" || word=="mais"){
					   
					   result = num1 + num2
					   say(num1 + num2)
					   
				   } else if(word=="times" || word=="multiplicado-por"){
					   
					   result = num1 * num2
					   say(num1 * num2)
					   
				   } else if(word=="divided-by" || word=="dividido-por"){
					   
					   result = num1 / num2
					   say(num1 / num2)
					   
				   }
				   
				  if(result != null){
					  
					  if(debugging){
						  WScript.Echo("Result of count = " + result)
					  }
					  phraseToReturn += mathAnswers[Math.floor(Math.random() * mathAnswers.length)] + result + " "
					  continue
				  }
				  
			}
			
		}
			
			
			
		}
		
		// math endes
		
		
		
	}
	}
	
	return [phraseToReturn, funct]
	
}













function say(what){
	if(debugging){
		WScript.Echo(what)
	}
}

function justSay(what){
	if(voiceOn){
		talk.Speak(what)
	}
}







function sorry(){
	
	var sorryPhrase = sories[Math.floor(Math.random() * sories.length)]
		WScript.Echo(sorryPhrase)
		justSay(sorryPhrase)
}




function answer(table){
	
	var sequence = table[0]
	var funct = table[1]
	
	if(funct != null){
	
		var locattion = funct
		
		if(fso.fileExists(locattion)){
		shell.Run(locattion)
		} else {
			var theText = locattion + placeDoesntExists[Math.floor(Math.random() * placeDoesntExists.length)]
			WScript.Echo(theText)
			justSay(theText)
			return
	}
}
	
	WScript.Echo("CAISII: " + sequence)
	justSay(sequence)
	
}







while(true){
	
	
	
	var input = WScript.StdIn.ReadLine()
	var inputWasAInChatSolicitation
	
	
	input = applyParamsTo(input)
	var inputParts = input.split(" ")
	
	for(var i = 0; i < inputParts.length; i++){
		
	var word = inputParts[i]
	
	var debugNearity = checkNearityOf(word, "debug")
	var voiceNearity = checkNearityOf(word, "voice")
	
	if(word=="debug" || debugNearity){
		WScript.Echo("Debugging mudou de sinal!")
		debugging = !debugging
		inputWasAInChatSolicitation = true
		} else if(word=="voice" || voiceNearity) {
			voiceOn = !voiceOn
			WScript.Echo("A voz esta habilitada")
			answer(["A voz esta habilitada"])
			inputWasAInChatSolicitation = true
		}
		
		
	}


	if(!inputWasAInChatSolicitation){
	var table = makeSequenceOf(input)
	
	
	if(input != "" && input != " " && table[0] != ""){

	answer(table)
	
	} else {
		
		sorry()
		
	}
	}
	if(debugging){
	WScript.Echo("/////////")
	}
	inputWasAInChatSolicitation = false
	
}