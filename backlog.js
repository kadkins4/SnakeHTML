const IMPROVEMENTS = [
    { title: 'add to portfolio', inProgress: true, notes: '', display: true, isCompleted: false },
    { title: 'color selected', inProgress: false, notes: '', display: false, isCompleted: false },
    { title: 'page views', inProgress: true, notes: '', display: true, isCompleted: true },
    { title: 'design', inProgress: true, notes: '', display: true, isCompleted: false },
    { title: 'high score ticker', inProgress: false, notes: '', display: false, isCompleted: false },
    { title: 'report a bug', inProgress: false, notes: '', display: false, isCompleted: false },
    { title: '360 map', inProgress: false, notes: '', display: false, isCompleted: false },
    { title: 'power ups', inProgress: false, notes: '', display: false, isCompleted: false },
    { title: 'timer obstacle', inProgress: false, notes: '', display: false, isCompleted: false },
    { title: 'add db', inProgress: false, notes: '', display: false, isCompleted: false }
    // { title: '', inProgress: false, notes: '', display: false, isCompleted: false }
]

const BACKLOG = document.getElementById( 'backlog' )

let showList = IMPROVEMENTS.filter( ( i ) => i.display === true )

showList.forEach( ( b ) => {
    let li = document.createElement( 'li' )
    BACKLOG.appendChild( li )
    li.innerHTML = b.title
    if ( b.inProgress ) {
        li.style.cssText = "color: yellow;"
    }
    if ( b.isCompleted ) {
        li.innerHTML += `&#10003;`
        li.style.cssText = "text-decoration: line-through green; font-weight: 200; color: green;"
    }
})