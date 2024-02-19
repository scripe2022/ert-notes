# ERT NOTES
[https://ert.jyh.sb](https://ert.jyh.sb)  
[Example](https://ert.jyh.sb/18A785CCA0BF1E5905780EA3C188BB1D)  
Create, edit and share tactics of WOW, quickly generate tactics and display in game  

## Features
- Import team members from [warcraftlogs.com](https://warcraftlogs.com)
- Import other team's timelines from [warcraftlogs.com](https://warcraftlogs.com)
- Replacement of key raid spells and roles
- Dynamic timer displayed in game

## In-game Examples
![](screenshot.gif)

## Docs
### Editing
Rich text content can be entered in the editor, and the preview box on the right dynamically outputs the content in the addon format. To use it in-game, click `[Copy Note]` or manually copy and paste the content into the addon.

### Login
Unregistered users can use a temporary tactical board but cannot save or share. Registered users can create, edit, save, and share tactical boards.

### Sharing
1. Sharing a single tactical board
Click `[Copy URL]` above the preview and share the link.
2. Sharing an account
Checking `[readonly mode]` during login allows password-free access. In readonly mode, you can access, share, and modify all tactical boards under the account but cannot save.

### Inserting Markers
Click the marker in the editor's toolbar to insert it into the tactical board.

### Team Members
Each tactical board's team information is independent; different boards can have different team members. There are three ways to import team members.
1. Enter member information directly.
2. Import default
Clicking `[Load default]` below team members imports default team members, overwriting current member information. New accounts have no default team members. To set default team members, click `[Set as default]` below team members. After setting a default lineup, new tactical boards will automatically use this default lineup.
3. Import from Warcraftlogs
Click `[Load From Warcraftlogs]` above team members, enter the WCL battle log address to import members from the log.  
(If the battle log includes multiple battles, all members will be imported.)

### Dynamic Timers
Insert a time marker in a line of the tactical board. This marker will convert into a dynamic countdown during the battle, with the entire line highlighted when the remaining time is under 10 seconds. `[Phase]` indicates the phase in which the timer operates, e.g.:
Entering `time 1:23, Phase 2` means starting a `1:23` countdown after entering `P2`.
Phase 0 indicates the timer operates throughout the entire battle (regardless of phase).
**Phase function depends on DBM/Bigwigs plugins**

### Spell Timers
This function is similar to the DBM/Bigwigs timer bars, e.g.:  
Entering `123456, 2` means displaying a timer bar 15 seconds before the boss's second use of the skill with ID `123456`, showing the content of that line.  
Setting the cast to 0 means displaying a timer bar for every cast.  
**This function depends on DBM/Bigwigs and WeakAuras**

### Event Timers
Event timers refer to starting a dynamic countdown after a certain event occurs, e.g.:  
`0:10, start casting, 123456, 2` means displaying a 10-second dynamic countdown timer when starting the second cast of the skill with ID `123456`.  
Events currently include start casting, cast success, applying Buff/Debuff, Buff/Debuff end.  
**This function depends on DBM/Bigwigs plugins**

### Single Line Comments
Sometimes you want to add some text hints in the tactical board but don't want them to show in the game. You can use three backslashes `///` to comment out that line's content.

### Suggestions
If the encounter's timeline is relatively fixed, try to use dynamic timers as much as possible. On one hand, the countdown provides better warnings for spells, and on the other hand, outdated information turns gray, making it easier to locate the battle phase.

### Players settings
Every member should open the tactical board, but not every member needs to see the entire board. Try to include relevant player names in the tactical board lines as much as possible. Players can select [hide timers that do not include my name] in the addon, so they can only see lines containing their ID and lines with colors.