const sortUserListByDeadline = (userList) => {
  const now = new Date();
  const priorityValue = { high: 1, medium: 2, low: 3 };

  userList.sort((a, b) => {
    // Compare priorities
    const aPriority = priorityValue[a.priority];
    const bPriority = priorityValue[b.priority];
    const priorityDiff = aPriority - bPriority;

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    // If priorities are the same, compare deadlines
    const aDeadline = new Date(a.deadline);
    const bDeadline = new Date(b.deadline);

    const aTime = aDeadline - now;
    const bTime = bDeadline - now;

    return aTime - bTime; // Sort in ascending order based on time remaining
  });
};
module.exports = sortUserListByDeadline;