function returnTaskHTML(i, task, status) {
    return document.getElementById(status).innerHTML += /*html*/ `
    <div draggable="true" ondragstart="startDragging(${i})" id="task-${i}" class="task-container">
        <h3><b>${task['title']}</b></h3>
        <div class="task-information-container">
            <div class="task-information-content mobile-center">
                <div class="task-info-left-column"><b>Category: </b></div>
                <div class="task-info-right-column">${task['category']}</div>
            </div>
            <div class="task-information-content horizontal-mobile">
                <div class="task-info-left-column"><b>Urgency: </b></div>
                <div id="urgency-${i}" class="task-info-right-column"></div>
            </div>
            <div class="task-information-content horizontal-mobile">
                <div class="task-info-left-column"><b>From: </b></div>
                <div id="" class="task-info-right-column">${new Date(task['createdAt']).toLocaleDateString('eu-DE')}</div>
            </div>
            <div class="task-information-content horizontal-mobile">
                <div class="task-info-left-column"><b>Due: </b></div>
                <div id="" class="task-info-right-column">${new Date(task['date']).toLocaleDateString('eu-DE')}</div>
            </div>
            <div class="task-information-content">
                <div class="task-info-left-column mobile-center bold-mobile"><b>Assigned to: </b></div>
                <div id="assigned-to-${i}" class="task-info-right-column assigned-to-list mobile-center">
                </div>
            </div>
            <div class="task-information-content">
                <div class="task-info-left-column mobile-center"><b>Description:</b></div>
                <div id="" class="task-info-right-column">${task['description']}</div>
            </div>
        </div>
    </div>
    `;
}