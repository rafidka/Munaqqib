import shelljs from "shelljs";

if (!shelljs.ls().includes("dist")) {
  console.error("'dist' directory is not created yet.");
  process.exit(1);
}

// Clean up existing directories.

// Copy views
shelljs.rm("-rf", "dist/views");
shelljs.cp("-R", "src/server/views", "dist/views");
