import { exec } from 'child_process';
import path from 'path';

export default function handler(req, res) {
  const scriptPath = path.join(process.cwd(), 'src', 'app', 'api', 'genai.py');

  exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }

    // Send the output from the Python script
    res.status(200).json({ output: stdout });
  });
}