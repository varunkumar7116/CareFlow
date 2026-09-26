package com.careflow.task;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@PreAuthorize("hasAnyRole('CHW', 'FACILITY_STAFF', 'DISTRICT_OFFICER', 'ADMIN', 'SYSTEM_ADMIN')")
public class TaskController {

    private final CareTaskRepository taskRepository;

    public TaskController(CareTaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public ResponseEntity<List<CareTask>> getAllTasks() {
        return ResponseEntity.ok(taskRepository.findAll());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CareTask>> getTasksForUser(@PathVariable String userId) {
        return ResponseEntity.ok(taskRepository.findByAssignedUserId(userId));
    }

    @GetMapping("/facility/{facilityId}")
    public ResponseEntity<List<CareTask>> getTasksForFacility(@PathVariable String facilityId) {
        return ResponseEntity.ok(taskRepository.findByAssignedFacilityId(facilityId));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<CareTask> completeTask(@PathVariable String id) {
        CareTask task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task not found: " + id));

        task.setStatus(TaskStatus.COMPLETED);
        task.setResolvedAt(ZonedDateTime.now());
        return ResponseEntity.ok(taskRepository.save(task));
    }
}
