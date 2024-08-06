README.md
Create a README.md with instructions to build and run the Docker container.

# Portfolio Website

## Instructions

1. Build the Docker image:
    
bash
    docker build -t lastName_firstName_coding_assignment14 .
    
2. Run the Docker container:
    
bash
    docker run -d -p 5575:80 --name lastName_firstName_coding_assignment14 lastName_firstName_coding_assignment14
    
3. Open your browser and visit `http://localhost:5575`.

4. Directory Structure

my-portfolio/
├── src/
│   ├── components/
│   │   ├── BasicInformation.js
│   │   ├── Work.js
│   │   ├── Skills.js
│   │   ├── Resources.js
│   │   └── DeveloperSetup.js
│   └── App.js
├── Dockerfile
├── README.md
├── package.json
└── ...#   p o r t f o l i o  
 