# team-builder
A command line app that generates a dev team roster

## Usage

Please install all dependencies prior to running. 

When the program is initiated, the user will be prompted to enter the manager's name, id, email, and office number. If the development team has more than one manager, the user has the option of adding additional managers. 

The user is then prompted to add an engineer, if desired. The user then enters the engineer's name, id, email, and GitHub username. The user can add as many teammembers as necessary.

Once the engineers are added, the user can then enter any interns who may be part of the team. The user adds the name, id, email, and school for each intern. 

If the user fails to enter information at any point during the building of the team, the user will be shown an error message and prompted to enter at least one character before proceeding.

Once all team members are added, an HTML file will be generated in the 'output' folder containing the team roster with all pertinent information for each team member.


## Information

Built using Node.js and the inquirer library.


Below is an example of the inputs a user will be prompted to use:

![Image of user inputs]
(assets/app-prompts.png)

Below is an example of the output:

![Image of example output]
(assets/app-output.png)

## Testing

Please use the command 'npm run test'
