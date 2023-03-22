export function CreateUser() {
  return (
    <div>
      <form
        action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
        method="POST"
      >
        <input
          type="hidden"
          value='{"keyname":"F2FNorg","fallback":"true","orgId":"00Di0000000JY6E","ts":""}'
        />
        <input type="hidden" name="oid" value="00Di0000000JY6E" />
        <input type="hidden" name="retURL" value="http://" />
        <label for="first_name">First Name</label>
        <input
          id="first_name"
          maxlength="40"
          name="first_name"
          size="20"
          type="text"
        />
        <br />
        <label for="last_name">Last Name</label>
        <input
          id="last_name"
          maxlength="80"
          name="last_name"
          size="20"
          type="text"
        />
        <br />
        <label for="email">Email</label>
        <input id="email" maxlength="80" name="email" size="20" type="text" />
        <br />
        <label for="mobile">Mobile</label>
        <input id="mobile" maxlength="40" name="mobile" size="20" type="text" />
        <br />
        <label for="city">City</label>
        <input id="city" maxlength="40" name="city" size="20" type="text" />
        <br />
        Disability:
        <select id="00N1Y00000JCOsq" name="00N1Y00000JCOsq" title="Disability">
          <option value="">--None--</option>
          <option value="Autism">Autism</option>
          <option value="Deaf/Hard of Hearing">Deaf/Hard of Hearing</option>
          <option value="Deaf Blindness">Deaf Blindness</option>
          <option value="Emotional Disturbance">Emotional Disturbance</option>
          <option value="Intellectual Disability">
            Intellectual Disability
          </option>

          <option value="Orthopedic Impairment">Orthopedic Impairment</option>
          <option value="Other Health Impairment">
            Other Health Impairment
          </option>
          <option value="Specific Learning Disability">
            Specific Learning Disability
          </option>
          <option value="Speech or Language disability">
            Speech or Language disability
          </option>
          <option value="Traumatic Brain Injury">Traumatic Brain Injury</option>
          <option value="Visual Disability/Blind">
            Visual Disability/Blind
          </option>
          <option value="Multiple Disabilities">Multiple Disabilities</option>
          <option value="Non-Categorical Early Childhood">
            Non-Categorical Early Childhood
          </option>
        </select>
        <br />
        <label for="lead_source">Lead Source</label>
        <select id="lead_source" name="lead_source">
          <option value="Mobile App">Mobile App</option>
        </select>
        <br />
        Create Date:
        <span class="dateInput dateOnlyInput">
          <input
            id="00Ni000000Ddnye"
            name="00Ni000000Ddnye"
            size="12"
            type="text"
          />
        </span>
        <br />
        <input type="submit" name="submit" />
      </form>
    </div>
  );
}
