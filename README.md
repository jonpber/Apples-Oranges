# Apples & Oranges
Please visit the [Project Repo](https://github.com/Db8-App/db8) for the full project. 

A handy app to settle your differences on the net.

# Usage

As users visit the index, they are welcomed by the ongoing debates sorted by popularity, or current number of votes. From there they can visit a debate and vote/chat or create a debate of their own.

# Create a Debate

Users can create a debate at any time by setting up the parameters for the debate.

- Debate topic (e.g. "Apples vs. Oranges")
- Debate Side 1 ("Apples")
- Debate Side 2 ("Oranges")
- Max Number of votes (This is always an odd number to determine when the debate ends and which side won).
Once the max number of votes is achieved, the debate is archived and voting is closed.

# Vote and Chat

In each unique debate page (or arena), users can vote on a debate side or chat. Both utilize socket.io to update realtime, so votes are tracked as they happen on every users window both in the debate page and the index.

# Technology Used

jQuery
Handlebars
Sequelize
MySQL
Socket.io
Materialize
Izimodal

# Created By

Jon Berry
Jarrod Costopulos
Henry Unga
