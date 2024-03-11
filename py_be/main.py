from flask import Flask, request, jsonify
from pypdf import PdfReader 
import re

app = Flask(__name__)

def extract_text_from_pdf(file):
    reader = PdfReader(file)
    txt = ""
    for i in range(len(reader.pages)):
        txt += reader.pages[i].extract_text()
    new_txt = txt.replace("\n","")
    
    new_txt = re.sub(r"\s+", " ", new_txt).strip()
    return txt

def extract_skills(resume_text, skills):
    extracted_skills = []
    for skill in skills:
        # Case-insensitive match using regular expressions
        pattern = re.compile(r'\b{}\b'.format(re.escape(skill)), re.IGNORECASE)
        if pattern.search(resume_text):
            extracted_skills.append(skill)
    return extracted_skills

@app.route('/', methods=['GET'])
def home():
    return jsonify({'error': 'No file part'})

@app.route('/upload_resume', methods=['POST'])
def upload_resume():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file part'})
    
    resume_file = request.files['resume']
    if resume_file.filename == '':
        return jsonify({'error': 'No selected file'})

    resume_text = extract_text_from_pdf(resume_file)
    # Here you would implement logic to parse resume_text and extract skills and experience
    skills_to_extract = ['Python', 'JavaScript', 'SQL', 'Team leadership', 'NodeJs', 'MongoDB', 'ExpressJs', 'CSS', 'HTML', 'Javascript', 'Machine Learing', 'Deep Learning', 'ReactJs', 'Java', 'C', '#C', 'python', 'automation', 'numpy', 'C++', '.Net', 'Angular']
    
    skills = extract_skills(resume_text, skills_to_extract)
    # For demonstration, let's assume we extracted some skills and experience
    # skills = ['Python', 'JavaScript', 'SQL']
    experience = '5 years of software development experience'

    return jsonify({'skills': skills, 'experience': experience})

if __name__ == '__main__':
    app.run(debug=True)