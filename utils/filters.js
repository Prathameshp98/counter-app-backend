
const totalActivity = [
    { name: "PR Open", value: 0 },
    { name: "PR Merged", value: 0 },
    { name: "Commits", value: 0 },
    { name: "PR Reviewed", value: 0 },
    { name: "PR Comments", value: 0 },
    { name: "Incident Alerts", value: 0 },
    { name: "Incidents Resolved", value: 0 }
];

const convertDateFormat = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
}

exports.filterByName = (response, name) => {
    const filteredByName = response[0].data.AuthorWorklog.rows.filter(user => user.name === name);
    response[0].data.AuthorWorklog.rows = filteredByName;
    return response;
}

exports.filterByDate = (response, startDate, endDate) => {
    const dayWiseActivity = response[0].data.AuthorWorklog.rows[0].dayWiseActivity;

    const start = convertDateFormat(startDate);
    const end = convertDateFormat(endDate);

    const updatedDayWiseActivity = dayWiseActivity.filter(activity => {
        const activityDate = activity.date;
        return activityDate >= start && activityDate <= end;
    });

    updatedDayWiseActivity.forEach(activity => {
        activity.items.children.forEach(item => {
          const activityType = totalActivity.find(act => act.name === item.label);
          if (activityType) {
            activityType.value += parseInt(item.count, 10);
          }
        });
    });

    response[0].data.AuthorWorklog.rows[0].dayWiseActivity = updatedDayWiseActivity;
    response[0].data.AuthorWorklog.rows[0].totalActivity = totalActivity;

    return response;
}
