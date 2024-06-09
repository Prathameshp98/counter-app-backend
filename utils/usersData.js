
const usersData = (data) => {
    // console.log("--",data)

    const allStats = { name: 'all' };

    // Initialize totalAct with zero values
    const totalAct = data.rows[0].totalActivity.map(activity => ({ ...activity, value: 0 }));

    // Calculate the total for each activity type
    data.rows.forEach(row => {
        row.totalActivity.forEach((activity, index) => {
            totalAct[index].value += parseInt(activity.value, 10);
        });
    });

    // You might want to assign totalAct to allStats if needed
    allStats.totalActivity = totalAct;

    // console.log(allStats);

    const dayWiseAct = [];

    // Initialize dayWiseAct with deep copies and set counts to 0
    for (let i = 0; i < 14; i++) {
        const temp = JSON.parse(JSON.stringify(data.rows[0].dayWiseActivity[i]));
        temp.items.children.forEach(child => {
            child.count = 0;
        });
        dayWiseAct.push(temp);
    }

    // Sum the counts
    data.rows.forEach(row => {
        row.dayWiseActivity.forEach((activity, index) => {
            activity.items.children.forEach((child, _index) => {
                dayWiseAct[index].items.children[_index].count += parseInt(child.count);
            });
        });
    });

    allStats.dayWiseActivity = dayWiseAct

    return allStats;
}

module.exports = usersData;