# sodmat

Food in sodmat is structured as a JavaScript object.
The object is structured as following: 
```
food = {
	weekNumber[int]: {
		dayNumber[int 1-5]: {
			normal: "Normal food offering",
			vego: "Vegertarian food offering",
			extra: "Extra food offering" (optional)
		},
		...
	}
}
```
Sodmat is designed to be a very simple page for showing what food is available in school every day to the students of NTI-Gymnasiet Södertörn. It was created together with Sodschema as a suite of web apps to improve the daily life of students.
