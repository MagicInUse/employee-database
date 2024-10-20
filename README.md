# Employee Database
A CLI Node.js server that utilizes the PostgreSQL database format to store company information regarding employees and management.

## Features

- **CLI Interface**: User-friendly command-line interface for easy interaction.
- **PostgreSQL Integration**: Seamless integration with PostgreSQL for robust data management.
- **Modular Architecture**: Clean and maintainable code structure with modular components.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/MagicInUse/employee-database.git
    ```
2. Navigate to the project directory:
    ```sh
    cd your-repo
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Install PostgreSQL:
    Follow the instructions on the [official PostgreSQL website](https://www.postgresql.org/download/) to download and install PostgreSQL for your operating system.

5. Set up the database schema and seed data:
    ```sh
    psql -U yourusername -d database_db -f schema.sql
    psql -U yourusername -d database_db -f seeds.sql
    ```
    Replace `yourusername` and `database_db` with your actual PostgreSQL username and database name.

6. Set up environment variables:
    Create a `.env` file in the root of your project and add the following variables:
    ```sh
    DB_NAME=database_db
    DB_USER=yourusername
    DB_KEY=yourpassword
    ```
    Replace `yourusername`, `yourpassword`, and `yourdatabase` with your actual PostgreSQL credentials and database name.

## Usage

1. Start the server:
    ```sh
    npm start
    ```
2. Follow the CLI prompts to interact with the server.

3. A demonstration video can be found [here](https://youtube.com/MagicInUse/).

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.


### References
The [ASCII Art](https://ascii-generator.site/t/) as seen in the Cli.ts startCli() method. BIG COMPANY!