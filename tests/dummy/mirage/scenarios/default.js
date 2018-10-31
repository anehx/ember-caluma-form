export default function(server) {
  const form = server.create("form");

  const questions = [
    server.create("question", {
      slug: "text-question",
      formIds: [form.id],
      type: "TEXT"
    }),
    server.create("question", {
      slug: "textarea-question",
      formIds: [form.id],
      type: "TEXTAREA"
    }),
    server.create("question", {
      slug: "integer-question",
      formIds: [form.id],
      type: "INTEGER",
      minValue: 0,
      maxValue: 200
    }),
    server.create("question", {
      slug: "float-question",
      formIds: [form.id],
      type: "FLOAT",
      minValue: 0,
      maxValue: 200,
      isHidden: "'integer-question'|answer < 5"
    }),
    server.create("question", {
      slug: "radio-question",
      formIds: [form.id]
    }),
    server.create("question", {
      slug: "checkbox-question",
      formIds: [form.id],
      type: "CHECKBOX",
      isHidden: "'float-question'|answer < 10"
    })
  ];

  const document = server.create("document", { formId: form.id });

  questions.forEach(question => {
    server.create("answer", {
      questionId: question.id,
      documentId: document.id
    });
  });
}
