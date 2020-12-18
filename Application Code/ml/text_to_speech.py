from gtts import gTTS
import os
text="hey! O-bot here how can i help you"
language='en'
myobj = gTTS(text=text, lang=language, slow=False) 
myobj.save("vely.mp3")

os.system("vely.mp3")