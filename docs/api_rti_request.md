## 1. API Endpoint

```
/api/rti-request
```

## 2. Input Validation

The following fields are always required:

* `ministry_department`
* `public_authority`
* `email`
* `rti_text`

### Personal Details

If `digilocker` is `false`, these fields are compulsory:

* `name`
* `gender`
* `address`
* `pin_code`

If `digilocker` is `true`, these fields do not need to be provided. The API stores placeholders (these values can later be replaced with the actual DigiLocker data)

### BPL Applicant

If `is_bpl` is `true`, all of the following are required:

* `bpl_card_number`
* `bpl_card_filename`
* `year_of_issue`
* `issuing_authority`

If `is_bpl` is `false`, these fields are stored as `NULL`.

---

## 2. Possible Responses

### `201 Created`


```json
{
  "success": true,
  "message": "RTI request created successfully",
  "request": {
    "id": "uuid",
    "request_number": 1001,
    "created_at": "2026-08-26T11:30:00Z"
  }
}
```

### `400 Bad Request`

```json
{
  "error": "Ministry/department is required"
}
```

```json
{
  "error": "Public authority is required"
}
```

```json
{
  "error": "Email is required"
}
```

```json
{
  "error": "RTI text is required"
}
```

```json
{
  "error": "Name is required"
}
```

```json
{
  "error": "Gender is required"
}
```

```json
{
  "error": "Address is required"
}
```

```json
{
  "error": "Pin code is required"
}
```

```json
{
  "error": "BPL card number is required"
}
```

```json
{
  "error": "BPL card file is required"
}
```

```json
{
  "error": "BPL card year of issue is required"
}
```

```json
{
  "error": "BPL card issuing authority is required"
}
```

### `500 Internal Server Error`

```json
{
  "success": false,
  "error": "Failed to create RTI request"
}
```
