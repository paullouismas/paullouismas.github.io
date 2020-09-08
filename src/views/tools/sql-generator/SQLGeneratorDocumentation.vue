<template>
  <div>
    <section class="hero is-light is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="is-1 title is-spaced">
            SQL Commmand Generator
          </h1>

          <h3 class="is-3 subtitle">
            Documentation
          </h3>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-narrow">
            <aside class="menu">
              <p class="menu-label">
                Menu
              </p>

              <ul class="menu-list">
                <li>
                  <a href="#basic-usage">
                    Basic usage
                  </a>
                </li>
                <li>
                  <a href="#foreign-keys">
                    Foreign keys
                  </a>
                </li>
              </ul>
            </aside>
          </div>

          <div class="collumn">
            <div class="content box">
              <a href="#basic-usage" class="title anchor" id="basic-usage">
                Basic usage
              </a>

              <div class="tile is-ancestor">
                <div class="tile is-parent">
                  <div class="tile is-child">
                    <p>
                      Consider the following table definition:
                    </p>

                    <pre class="line-numbers">
                      <code class="language-sql">
                        CREATE TABLE [Employee] (
                          IdEmployee INT IDENTITY,
                          Name VARCHAR(64) UNIQUE NOT NULL,
                          Department VARCHAR(2) NOT NULL
                        )
                      </code>
                    </pre>
                  </div>
                </div>

                <div class="tile is-parent">
                  <div class="tile is-child">
                    <p>
                      And the following CSV data:
                    </p>

                    <pre class="line-numbers">
                      <code class="language-csv">
                        Name,Department
                        Alice,IT
                        Bob,HR
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              <p>
                The associated INSERT statement would be:
              </p>

              <pre class="line-numbers">
                <code class="language-sql">
                  INSERT INTO [Employee] (Name, Department) VALUES
                    ('Alice', 'IT'),
                    ('Bob', 'HR')
                </code>
              </pre>

              <p>
                This tool allows you to dynamically generate INSERT statements using the following format:
              </p>

              <pre class="line-numbers">
                <code class="language-none">
                  INSERT INTO [ &lt;TABLE_NAME&gt; ] ( [COLUMNS] ) VALUES
                    ( &lt;INSERT_FORMAT&gt; ) ...
                </code>
              </pre>

              <p>
                Where <code class="language-none">TABLE_NAME</code> represent the target table, <br>
                <code class="language-none">COLUMNS</code> represent the list of columns (separated by a comma) that will receive values, <br>
                and <code class="language-none">INSERT_FORMAT</code> is the format of a single value insert.
              </p>

              <p>
                <a href="../?csv=EmployeName%252CEmployeDepartment%250AAlice%252CIT%250ABob%252CHR&csvHasHeaders=true&separator=%252C&tableName=Employees&columnsName=Name%252C%2520Department&valuesFormat=%252F%252F%2520This%2520is%2520a%2520comment%252C%2520it%2520will%2520be%2520ignored%2520while%2520parsing%250A%250A%28%250A%2509%27%253F1%253F%27%252C%2520%252F%252F%2520The%2520first%2520argument%250A%2509%27%253F2%253F%27%2520%252F%252F%2520The%2520second%2520argument%250A%29" target="_blank">
                  Try the example for yourself
                </a>
              </p>
            </div>

            <hr />

            <div class="content box">
              <a href="#foreign-keys" class="title anchor" id="foreign-keys">
                Foreign keys
              </a>

              <p>
                If you wanna insert foreign keys based on other tables, you need to build the requests inside the statement
              </p>

              <div class="tile">
                <div class="tile is-parent is-vertical">
                  <div class="tile is-child">
                    <p>
                      Table Employee
                    </p>

                    <pre class="line-numbers">
                      <code class="language-sql">
                        CREATE TABLE [Employee] (
                          IdEmployee INT IDENTITY,
                          Name VARCHAR(64) UNIQUE NOT NULL,
                          IdDepartment INT NOT NULL
                        )
                      </code>
                    </pre>
                  </div>

                  <div class="tile is-child">
                    <p>
                      Employee CSV
                    </p>

                    <pre class="line-numbers">
                      <code class="language-csv">
                        Name,Department
                        Alice,IT
                        Bob,HR
                      </code>
                    </pre>
                  </div>
                </div>

                <div class="tile is-parent is-vertical">
                  <div class="tile is-child">
                    <p>
                      Table Department
                    </p>

                    <pre class="line-numbers">
                      <code class="language-sql">
                        CREATE TABLE [Department] (
                          IdDepartment INT IDENTITY,
                          Name VARCHAR(64) UNIQUE NOT NULL,
                          Code CHAR(2) UNIQUE NOT NULL
                        )
                      </code>
                    </pre>
                  </div>

                  <div class="tile is-child">
                    <p>
                      Department CSV
                    </p>

                    <pre class="line-numbers">
                      <code class="language-csv">
                        Code,Name
                        IT,Information Technology
                        HR,Human Ressources
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              <p>
                The values format will be
              </p>

              <pre class="line-numbers">
                <code class="language-none">
                  (
                    '?1?', // For the 1st argument
                    (
                      SELECT
                          IdDepartment
                        FROM Department
                        WHERE
                          Code = '?2?'
                    ) // For the second argument as a foreign key
                  )
                </code>
              </pre>

              <p>
                Which will build sub-requests inside each of every insert call.
              </p>

              <p>
                <a href="../?csv=Name%252CDepartment%250AAlice%252CIT%250ABob%252CHR&csvHasHeaders=true&tableName=Employee&columnsName=Name%252C%2520IdDepartment&valuesFormat=%28%250A%2509%27%253F1%253F%27%252C%2520%252F%252F%2520For%2520the%25201st%2520argument%250A%2509%28%250A%2509%2509SELECT%250A%2509%2509%2509%2509IdDepartment%250A%2509%2509%2509FROM%2520Department%250A%2509%2509%2509WHERE%250A%2509%2509%2509%2509Code%2520%253D%2520%27%253F2%253F%27%250A%2509%29%2520%252F%252F%2520For%2520the%2520second%2520argument%2520as%2520a%2520foreign%2520key%250A%29" target="_blank">
                  Try the example for yourself
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SQLGeneratorDocumentation',
  components: {
    //
  },
  mounted() {
    [
      'https://cdn.jsdelivr.net/npm/prismjs@1.20.0/prism.min.js',
      'https://cdn.jsdelivr.net/npm/prismjs@1.20.0/plugins/line-numbers/prism-line-numbers.min.js',
      'https://cdn.jsdelivr.net/npm/prismjs@1.20.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js'
    ].forEach(source => {
      const externalScript = document.createElement('script')

      externalScript.setAttribute('src', source)

      document.head.appendChild(externalScript)
    })
  }
})
</script>

<style lang="less">
  @import "https://cdn.jsdelivr.net/npm/prismjs@1.20.0/themes/prism-solarizedlight.css";
  @import "https://cdn.jsdelivr.net/npm/prismjs@1.20.0/plugins/line-numbers/prism-line-numbers.css";

  aside.menu {
    position: sticky;
    top: 0;

    & .menu-label {
      padding-top: 75px;
    }
  }
</style>
