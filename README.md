# office_status_website
This is a small webserver used to work with a Raspberry Pi 0 W to check if it is open. 

# How it works?
Raspberry Pi 0 W is reads out the input of a limit switch that is placed at the end of a lock socket.
- If the lock is closed (meaning there is noone in the office) the limit switch is pressed and status is set to EMPTY
- If the lock is open (meaning someone is in the office) the limit switch is open and the status is set to OCCUPIED

# Setting up the system and the server
- Install Raspbian on the device.
- Install node via Apt (if it is Raspberry PI 0, only node up to 11.X.X supports it's ARMVl6 architecture)
- Move the files to raspberry Pi (e.g. through cloning this repo).
- Install all dependencies via NPM (Note: onoff requires Python2 as main python command, so you may need to change your bash profile as current Raspbian comes with Python3 as default Python).
- Set up tunneling (I've used [Dataplicity](https://www.dataplicity.com/) but there could be other alternatives, just make sure they work with ARMVl6 and older node versions).
- Create `office_status.txt` file in the server catalogue.
- Run the server. You should now be able to access the server via your tunneling wormhole from anywhere.
- From the limit switch connect the NC to GPIO 17, NO to GPIO 27, C to 5V or 3.3V (altough you can choose any valid GPIO). 
- Interrupts from witch should now write to your `office_status.txt` file which will be read by the server and will return the status of the office - Congrats!

# What to improve (27/04/2022)
- Add better error handling
- Add reading from both PINS
- Add setup nice domain url
- Add running the server to CRON so that it runs on booting the os
