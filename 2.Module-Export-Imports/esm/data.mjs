const userData = {
    personalInfo: {
        name: 'JK',
        age: 30,
        gender: 'Male',
        hobbies: ['singing', 'learning', 'coding', 'traveling'],
    },

    professionalInfo: {
        designation: 'Software Engineer',
        company: 'Nexkraft Ltd.',
        yearsOfExperience: 3,
        workingStack: ['PHP', 'Laravel', 'NodeJS', 'Ruby'],
    },

    getPersonalInfo() {
        return `Name: ${this.personalInfo.name}, 
        Age: ${this.personalInfo.age}, 
        Gender: ${this.personalInfo.gender}, 
        Hobbies: ${this.personalInfo.hobbies.join(', ')}`;
    },

    getProfessionalInfo() {
        return `Designation: ${this.professionalInfo.designation}, 
        Company: ${this.professionalInfo.company}, 
        Experience: ${this.professionalInfo.yearsOfExperience} years`;
    },
};

module.exports = {
    userData
};
