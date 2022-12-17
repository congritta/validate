# Validate

This is my small typescript library for validating any data. Usually I use it to validate requests data in my REST APIs or form data validating in browsers.

## How to:

__Install to a project__: Just copy `src/index.ts` or `dist/index.js` to your project\

__Install for development__: `npm install`\
__Compile typescript to javascript__: `npm run build`\
__Run for development__: `npm run dev`\
__Run eslint__: `npm run lint`

## How it works

I created an object in which every method is a validation rule. A create a method for all validation rules I about to use.

```typescript
const validationRules = {
  personName(entity: unknown) {
    if(typeof entity !== "string") {
      return false;
    }

    return (/^[А-ЯЁA-Z][а-яё\-a-z]{1,25}[а-яa-zё]$/).test(entity);
  }
  //...
};
```

If the function returns `true` that validation is successed. Otherwars not successed. You can define your own method and it may return anything you want.

To validate anything, import `validate` function and call it like this:
```typescript
validate('personName', "Alex")
```

It returns `true` because entity `"Alex"` provided to `personName` function and it returned true

---

If you need to validate a lot of data, use can use `validateMany` function like this:

```typescript
validateMany([
  {rule: 'personName', entity: "Alex"},
  {rule: 'gender', entity: "make", displayRuleName: "userGender"},
])
```

This function returns array with validation invalid messages (if they exist) or empty array.

The "invalid" message seems like this: `"The "firstName" field is not valid"`. _displayRuleName`_ property is not requered. It replaces rule name in "invalid" message