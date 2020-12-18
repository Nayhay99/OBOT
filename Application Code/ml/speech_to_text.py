import speech_recognition as sr
r=sr.Recognizer()
with sr.Microphone() as source:

    print("SAY SOMETHING")
    audio=r.listen(source)
    print("TIME OVER,THANKS")
    
try:
    text=r.recognize_google(audio)
    print("you said:{}".format(text))
except:
    print("something went wrong..please try again")