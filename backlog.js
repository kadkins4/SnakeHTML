const IMPROVEMENTS = [
    { title: 'add to portfolio', inProgress: false, notes: '', display: true, isCompleted: false },
    { title: 'color selected', inProgress: false, notes: '', display: false, isCompleted: false },
    { title: 'page views', inProgress: false, notes: '', display: true, isCompleted: false },
    { title: 'design', inProgress: false, notes: '', display: true, isCompleted: false },
    { title: 'high score ticker', inProgress: false, notes: '', display: false, isCompleted: false },
    { title: 'report a bug', inProgress: false, notes: '', display: false, isCompleted: false },
    { title: '360 map', inProgress: false, notes: '', display: false, isCompleted: false },
    { title: 'power ups', inProgress: false, notes: '', display: false, isCompleted: false },
    { title: 'timer obstacle', inProgress: false, notes: '', display: false, isCompleted: false },
    { title: 'add db', inProgress: false, notes: '', display: false, isCompleted: false }
    // { title: '', inProgress: false, notes: '', display: false, isCompleted: false }
]

const BACKLOG = document.getElementById('backlog')

let showList = IMPROVEMENTS.filter( ( i ) => i.display === true )

showList.forEach( ( b ) => {
    let li = document.createElement('li')
    BACKLOG.appendChild(li)
    li.innerHTML = b.title
    if ( b.isCompleted ) {
        li.innerHTML += `&#10003;`
        li.style.cssText = "text-decoration: line-through green; font-weight: 200;";
    }
})