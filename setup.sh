set -e; # causes script to stop if there are any errors;

echo "If there are any errors this script will fail."
echo "Please correct errors, and re-run script.";
echo "---";

npm install;
echo "installed all node.js dependencies";

mysql < ./setup_files/create_tables.txt;
echo "created database, and all tables.";

mysql < ./setup_files/init_data.txt;
echo "initialized table data";
