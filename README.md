acTasks
=======

activeCollab Task interface based on AngularJS. The general idea is a snappier interface based on locally cached data and promises, so that interactions with the server are less painful. A simpler, more goal-directed interface (catering only to tasks in the first instance) is also an aim.

I'm working and testing against the latest version of ActiveCollab (3.x). I've not built in any AC Module integration yet, so to use this you have to set up an API key (Profile page > API access > new application) then copy the URL and key into the login page - they're stored in localStorage and used for all access after then. 

Auth is in a very early state. Ideally I want this to require email (ac uses this instead of username) and password, and to then get an API key automatically. Right now it just gets the details from the suer and saves them locally.

NB: This is experimental and I'm learning AngularJS as I build it.

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/80x15.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">acTasks</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/marcelkornblum/acTasks" property="cc:attributionName" rel="cc:attributionURL">Marcel Kornblum</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.

